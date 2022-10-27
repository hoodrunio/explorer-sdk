import { readdir, readFile, writeFile } from "fs/promises"
import { Operations } from "./types/internal"
import { Swagger } from "./types/swagger"
import * as yaml from 'yaml'
import { convertOperationsToTypeScriptTypes, generateOperations } from "./functions"
import { exit } from "process"

async function main() {
    // Define an object to store all the operations.
    let operations: Operations = {}

    // Define input folder path.
    const inputFolderPath: undefined | string = './input/'

    // Define out file path.
    const outFilePath: undefined | string = './out.ts'

    /// If environment variables aren't set, return error.
    if (inputFolderPath === undefined) {
        console.error(`Specify 'INPUT_FOLDER_PATH' to run this app.\n\nFor example: INPUT_FOLDER_PATH="./input" bun start\n`)
        process.exit(1)
    } else if (outFilePath === undefined) {
        console.error(`Specify 'OUT_FILE_PATH' to run this app.\n\nFor example: OUT_FILE_PATH="./out.ts" bun start\n`)
        process.exit(1)
    }

    // Get all the file names.
    const fileNames = await readdir(inputFolderPath, { encoding: 'utf-8' })

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