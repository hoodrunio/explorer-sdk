import { readdir, readFile, writeFile } from "fs/promises"
import { Operations } from "./types/internal"
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
    const outFilePath: string = './src/cosmos/types/methods/rest.ts'


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

        // Generate new `Operations` and add it to `operations`.
        operations = { ...generateOperations(chainName, swagger), ...operations }
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