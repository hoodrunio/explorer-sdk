export interface Swagger {
    info: SwaggerInfo
    paths: {
        [path in string]: SwaggerPath
    }
}

export interface SwaggerInfo {
    title: string
    description: string
    version: string
}


export interface SwaggerPath {
    get: SwaggerPathMethodData
    post: SwaggerPathMethodData
}

export interface SwaggerPathMethodData {
    summary: string
    operationId: string
    responses: {
        200: SwaggerPathResponse
        default: SwaggerPathResponse
    }
    parameters?: SwaggerParameter[]
}


export type SwaggerParameter = SwaggerParameterBody | SwaggerParameterPath | SwaggerParameterQuery

export interface SwaggerParameterPath {
    name: string
    description: string
    in: 'path'
    required: boolean
    type: 'string'
    format?: TypeFormats
}

export interface SwaggerParameterQuery {
    name: string
    description: string
    in: 'query'
    required: boolean
    type: 'string'
    format?: TypeFormats
}
export interface SwaggerParameterBody {
    name: string
    description?: string
    in: 'body'
    required: boolean
    type: 'string'
    format?: TypeFormats
    schema: SchemaRef
}

export type TypeFormats = 'int32' | 'int64' | 'uint32' | 'uint64'

export interface SwaggerPathResponse {
    description: string
    schema: Schema | SchemaRef
}


export type SchemaType = Schema extends { type: infer T } ? T : never

export type Schema = { $ref?: undefined } & (SchemaObject | SchemaArray | SchemaString | SchemaInteger | SchemaBoolean | SchemaNumber)

export type SchemaRef = {
    $ref: string
}


export type SchemaObject = {
    type: 'object'
    properties?: {
        [prop in string]: Schema
    }
    title?: string
    description?: string

}

export interface SchemaArray {
    type: 'array'
    items: Schema
    title?: string
    description?: string
}

export interface SchemaString {
    type: 'string'
    title?: string
    description?: string
}

export interface SchemaInteger {
    type: 'integer'
    title?: string
    description?: string
}

export interface SchemaBoolean {
    type: 'boolean'
    title?: string
    description?: string
}

export interface SchemaNumber {
    type: 'number'
    title?: string
    description?: string
}