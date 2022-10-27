import { Schema } from "./swagger"

type OperationId = string

export type OperationData = {
    method: 'get' | 'post'

    comment: string

    endpoint: {
        [chainName in string]: {
            endpointPath: string,
            comment: string,
        }
    }

    params: {
        path: {
            [chainName in string]: string
        }

        query: {
            [chainName in string]: string
        }

        body: {
            [chainName in string]: string
        }
    }

    response: {
        success: {
            [chainName in string]: string
        }

        error: {
            [chainName in string]: string
        }
    }
}

export type Operations = {
    [operationId in OperationId]: OperationData
}

export type Properties = {
    [property in string]: Property
}

export interface Property {
    type: InternalTypes, comment?: string | undefined
}

export type InternalTypes = 'string' | 'number' | 'boolean' | `Array<${'string' | 'number' | 'boolean' | `Array${string}` | `{${string}}`}>` | `{${string}}`
