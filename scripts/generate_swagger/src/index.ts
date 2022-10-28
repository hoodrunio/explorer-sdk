import { readdir, readFile, writeFile } from "fs/promises"
import { OperationData, Operations } from "./types/internal"
import { Swagger } from "./types/swagger"
import * as yaml from 'yaml'
import { convertOperationsToTypeScriptTypes, generateOperations, parseSchema, parseSchemaToTypeScript } from "./functions"
import { exit } from "process"

/** The entry of the application. */
async function main() {
    // Define an object to store all the operations.
    let operations: Operations = {}


    // EXPECT THE CURRENT WORKING DIRECTORY IS SET TO `sdk/`.

    // Define input folder path.
    const inputFolderPath: string = './inputs/swagger_info/'

    // Define out file path.
    const outFilePath: string = './src/types/methods/rest.ts'


    // Get all the file names.
    const fileNames = await readdir(inputFolderPath, { encoding: 'utf-8' })

    // Check if is there any file.
    if (fileNames.length === 0) {
        console.error(`There isn't any file inside 'sdk/inputs/swagger_info/' folder`)
        exit(1)
    }

    // Print start message.
    console.log('Swagger extraction starting...')


    // Do below for each file name in `fileNames`.
    for (const fileName of fileNames) {
        // Remove `.yaml` from `<NAME>.yaml`, to get chain name.
        const chainName = fileName.slice(0, fileName.length - 5)

        // Read the file.
        const fileContent = await readFile(inputFolderPath + fileName, { encoding: 'utf8' })

        // Parse the file content.
        const swagger = yaml.parse(fileContent) as Swagger

        console.log(chainName == 'evmos' ? JSON.stringify(Object.entries(swagger.paths).at(0)?.[1]?.get?.parameters) : 5)

        // Generate new `Operations` and add it to `operations`.
        const newOperations = generateOperations(chainName, swagger)
        for (const [operationId, operationData] of Object.entries(newOperations)) {
            const oldOperationData: OperationData | undefined = operations[operationId]
            operations[operationId] = {
                method: operationData.method,
                comment: operationData.comment ?? oldOperationData?.comment,
                endpoint: {
                    ...operationData.endpoint,
                    ...oldOperationData?.endpoint
                },
                params: {
                    path: { ...operationData.params.path, ...oldOperationData?.params?.path },
                    query: { ...operationData.params.query, ...oldOperationData?.params?.query },
                    body: { ...operationData.params.body, ...oldOperationData?.params?.body },
                },
                response: {
                    success: { ...operationData.response.success, ...oldOperationData?.response?.success, },
                    error: { ...operationData.response.error, ...oldOperationData?.response?.error, },
                }
            }
        }
    }

    // Convert `operations` to TypeScript type output.
    const typeScriptOutput = convertOperationsToTypeScriptTypes(operations)

    // Write TypeScript type output to out file.
    await writeFile(outFilePath, typeScriptOutput)


    // Print success message.
    console.log('Successfully finished!')

}

try {
    (async () => await main())()
} catch (error) {
    console.error(`An error occured.`, error)
    exit(1)
}