/** The ID of REST API operation. */
type OperationId = string

/** The data about REST API operation.  */
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

/** The object that holds multiple `OpearionID` and associated `OperationData`. */
export type Operations = {
    [operationId in OperationId]: OperationData
}

/** The object that holds multiple `Property` and associated name. */
export type Properties = {
    [propertyName in string]: Property
}

/** `Property` represent a property's type, and it's comment, if it exists. */
export interface Property {
    type: InternalTypes, comment?: string | undefined
}

/** The types which will be used while generating typescript types. */
export type InternalTypes = 'string' | 'number' | 'boolean' | `Array<${'string' | 'number' | 'boolean' | `Array${string}` | `{${string}}`}>` | `{${string}}`
