import { Operations, Properties, Property } from "./types/internal";
import { Schema, SchemaRef, Swagger, SwaggerParameter, SwaggerParameterPath, SwaggerPathMethodData } from "./types/swagger";

/**
 * Returns the schema representing the value of given reference inside given swagger.
 * 
 * # Usage
 * ```ts
 * const refObj = {
 *     $ref: '#/definitions/cosmos.tx.v1beta1.SimulateRequest'
 * }
 * 
 * // Returns swagger['definitions']['cosmos.tx.v1beta1.SimulateRequest'], if it exists.
 * const schema = getRef(refObj.$ref, swagger)
 * ```
 */
export function getRef(ref: string, swagger: Swagger): Schema | undefined {
    const refs = ref.split('/')
    const [refPath] = refs.slice(ref.length - 1);

    return (swagger as any)?.definitions[refPath] ?? undefined
}



/**
 * Parses schema type and comment to a property.
 * 
 * # Usage
 * ```ts
 * const schema: Schema = {
 *    type: 'string'
 *    description: 'the comment about this object'
 * }
 * 
 * const { type, comment }: Property = parseSchem(schema)
 * 
 * ```
 */
export function parseSchema(schema: Schema): Property {
    switch (schema.type) {
        case 'object': {
            const properties: Properties = {}
            if (schema.properties === undefined) {
                return {
                    type: '{}',
                }
            }
            const schemaProps = Object.entries(schema.properties)
            for (const [prop, propSchema] of schemaProps) {
                if (prop === 'type_url') {
                    properties.type_url = { type: 'string' }
                } else {
                    const parsedSchema = parseSchema(propSchema)
                    properties[prop] = {
                        type: parsedSchema.type,
                        comment: parsedSchema.comment
                    }
                }
            }

            let retStr = ''

            for (const [propName, property] of Object.entries(properties)) {
                const potentialComment = property.comment ? `/** ${property.comment} */\n` : ''

                retStr += `\n${potentialComment}${propName}: ${property.type}`
            }

            return {
                type: `{${retStr}\n}`,
                comment: (schema.title ?? schema.description)
            }
        }
        case 'array': {
            return {
                type: `Array<${parseSchema(schema.items).type}>`,
                comment: (schema.title ?? schema.description)
            }
        }
        case 'integer': {
            return {
                type: 'number',
                comment: (schema.title ?? schema.description)
            }
        }
        case 'number': {
            return {
                type: 'number',
                comment: (schema.title ?? schema.description)
            }
        }
        case 'string': {
            return {
                type: 'string',
                comment: (schema.title ?? schema.description)
            }
        }
        case 'boolean': {
            return {
                type: 'boolean',
                comment: (schema.title ?? schema.description)
            }
        }
    }
}


/** 
 * Returns a new endpoint after replacing path parameters with their types.
 */
export function parseEndpoint(endpoint: string, params?: SwaggerParameter[]) {
    if (!params) return endpoint


    for (const param of params.filter(param => param.in === 'path')) {
        endpoint = endpoint.replace(`{${param.name}}`, `\${${parseParameterType(param)}}`)
    }

    return endpoint
}


/** 
 * Returns TypeScript type representation of given schema.
 * 
 * # Usage
 * ```ts
 * const schema: Schema = {
 *    type: 'object'
 *    description: 'the person itself',
 *    properties: {
 *         age: {
 *             description: 'the age of the person',
 *             type: 'number' 
 *         },
 *         name: {
 *             description: 'the name of the person',
 *             type: 'string' 
 *         }
 *    }
 * }
 * 
 * // Returns string representation of the TS type.
 * const tsType: string = parseSchema(schema)
 * ```
 */
export function parseSchemaToTypeScript(schema: Schema | SchemaRef, swaggerObject: Swagger): string {
    if (typeof schema?.$ref === 'string') {
        const refSchema = getRef(schema.$ref, swaggerObject)
        if (refSchema !== undefined) {
            const property = parseSchema(schema as Schema)
            const comment = property?.comment ? `/** ${property?.comment} */\n` : ''
            return `${comment}${property?.type}`
        } else {
            return `unknown`
        }
    } else {
        const property = parseSchema(schema as Schema)
        const comment = property?.comment ? `/** ${property?.comment} */\n` : ''
        return `${comment}${property.type}`
    }
}

/** Parses parameter type. */
export function parseParameterType(param: SwaggerParameter): 'string' | 'number' {
    if (!param.format) return 'string'
    switch (param.format) {
        case 'int32': return 'number'
        case 'int64': return 'number'
        case 'uint32': return 'number'
        case 'uint64': return 'number'
        default: return 'string'
    }
}

/** Parses parameters to Typescript types. Returns a tuple of path, query, and body params. */
export function parseParametersToTypescript(swaggerObject: Swagger, params?: SwaggerParameter[]): [string, string, string] {
    if (!params) {
        return ['undefined', 'undefined', 'undefined']
    }

    let pathParams = '{\n'
    let queryParams = '{\n'
    let bodyParams = '{\n'

    for (const param of params) {
        const paramName = param.name.includes('.') ? `'${param.name}'` : param.name
        const comment = param.description ? `/** ${param.description} */\n` : ''

        switch (param.in) {
            case 'path': {
                pathParams += `${comment}${paramName}: ${parseParameterType(param)}\n`
                break
            }
            case 'query': {
                queryParams += `${comment}${paramName}: ${parseParameterType(param)}\n`
                break
            }
            case 'body': {
                queryParams += `'${comment}${param.name}': ${parseSchemaToTypeScript(param.schema, swaggerObject)}\n`
                break
            }
        }
    }

    pathParams += '}'
    queryParams += '}'
    bodyParams += '}'

    return [pathParams.length === 3 ? 'undefined' : pathParams, queryParams.length === 3 ? 'undefined' : queryParams, bodyParams.length === 3 ? 'undefined' : bodyParams]
}


/** Generates a new `Operations` object by given chain name, and swagger. */
export function generateOperations(chainName: string, swagger: Swagger): Operations {
    const operations: Operations = {}

    for (const [endpoint, data] of Object.entries(swagger.paths)) {
        const method = data?.get ? 'get' : 'post'

        const methodData = data[method]




        const [pathParams, queryParams, bodyParams] = parseParametersToTypescript(swagger, methodData.parameters,)




        operations[methodData?.operationId] = {
            method,
            comment: methodData?.summary,
            endpoint: {
                [chainName]: {
                    endpointPath: parseEndpoint(endpoint, methodData.parameters),
                    comment: endpoint,
                }
            },
            params: {
                path: {
                    [chainName]: pathParams
                },
                query: {
                    [chainName]: queryParams
                },
                body: {
                    [chainName]: bodyParams
                }
            },
            response: {
                success: {
                    [chainName]: parseSchemaToTypeScript(methodData.responses[200].schema, swagger)
                },
                error: {
                    [chainName]: parseSchemaToTypeScript(methodData.responses.default.schema, swagger)
                }
            },
            ...operations
        };
    }

    return operations
}


/** Returns TypeScript representation of given `Operations`. */
export function convertOperationsToTypeScriptTypes(operations: Operations): string {
    let content = '// DO NOT EDIT THIS FILE MANUALLY\n\n'

    content += `/** REST API endpoint based on given \`ChainName\` and \`OperationId\`. */
    export type RestApiEndpoint<N extends ChainName, I extends OperationId> =
    RestApi[I] extends { endpoint: { [chainName in N]: infer E } } ? E : never\n\n`

    content += `/** REST API path parameters based on given \`ChainName\` and \`OperationId\`. */
    export type RestApiPathParams<N extends ChainName, I extends OperationId> =
    RestApi[I] extends { params: { path: { [chainName in N]: infer E } } } ? E : never\n\n`

    content += `/** REST API query parameters based on given \`ChainName\` and \`OperationId\`. */
    export type RestApiQueryParams<N extends ChainName, I extends OperationId> =
    RestApi[I] extends { params: { query: { [chainName in N]: infer E } } } ? E : never\n\n`

    content += `/** REST API body parameters based on given \`ChainName\` and \`OperationId\`. */
    export type RestApiBodyParams<N extends ChainName, I extends OperationId> =
    RestApi[I] extends { params: { body: { [chainName in N]: infer E } } } ? E : never\n\n`

    content += `/** REST API successful response type based on given \`ChainName\` and \`OperationId\`. */
    export type RestApiSuccessResponse<N extends ChainName, I extends OperationId> =
    RestApi[I] extends { response: { success: { [chainName in N]: infer E } } } ? E : never\n\n`

    content += `/** REST API error response type based on given \`ChainName\` and \`OperationId\`. */
    export type RestApiErrorResponse<N extends ChainName, I extends OperationId> =
    RestApi[I] extends { response: { error: { [chainName in N]: infer E } } } ? E : never\n\n`

    content += `/** Stores everything related to Rest API. */
    export interface RestApi {`

    const chainNames = new Set<string>()

    for (const [operationId, operation] of Object.entries(operations)) {

        content += `
/** ${operation.comment} */
${operationId}: {
    method: '${operation.method}'
    endpoint: ${(() => {
                let endpointString = '{\n'
                Object.entries(operation.endpoint).forEach(([chainName, endpoint]) => {
                    chainNames.add(chainName)
                    endpointString += `/** '${endpoint.comment}' */\n${chainName}: \`${endpoint.endpointPath}\`\n`
                })
                endpointString += '}'

                return endpointString
            })()}
    params: {
        path: ${(() => {
                let pathString = '{\n'
                Object.entries(operation.params.path).forEach(([chainName, pathParams]) => {
                    pathString += `${chainName}: ${pathParams}\n`
                })
                pathString += '}'

                return pathString
            })()}
    
        query: ${(() => {
                let queryString = '{\n'
                Object.entries(operation.params.query).forEach(([chainName, queryParams]) => {
                    queryString += `${chainName}: ${queryParams}\n`
                })
                queryString += '}'

                return queryString
            })()}
        body: ${(() => {
                let bodyString = '{\n'
                Object.entries(operation.params.query).forEach(([chainName, bodyParams]) => {
                    bodyString += `${chainName}: ${bodyParams}\n`
                })
                bodyString += '}'

                return bodyString
            })()}
    }
    response: {
        success: ${(() => {
                let successString = '{\n'
                Object.entries(operation.response.success).forEach(([chainName, responseType]) => {
                    successString += `${chainName}: ${responseType}\n`
                })
                successString += '}'

                return successString
            })()}
        error: ${(() => {
                let errorString = '{\n'
                Object.entries(operation.response.error).forEach(([chainName, responseType]) => {
                    errorString += `${chainName}: ${responseType}\n`
                })
                errorString += '}'

                return errorString
            })()}
    }

}
        `
    }

    content += '\n}'

    let chainNamesString = '\n\n/** Represent any of the available chain names. */\nexport type ChainName ='

    for (const chainName of chainNames) {
        chainNamesString += ` | '${chainName}'`
    }

    content += chainNamesString

    content += `\n\n/** Represent any of the available operation IDs. */\nexport type OperationId = keyof RestApi`


    return content
}