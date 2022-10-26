import { RESTDatas } from '../cosmos-44'

export type EvmosRESTMethod = keyof EvmosRESTDatas

export interface EvmosRESTErrorResponse {
    code: string
    message: string
    details: unknown[]
}

export type EvmosRESTSuccessResponse<T extends EvmosRESTMethod> = RESTDatas[T] extends {
    response: infer E
}
    ? E
    : never

export type RESTResponse<T extends EvmosRESTMethod> =
    | (EvmosRESTSuccessResponse<T> & { message: undefined })
    | EvmosRESTErrorResponse

export type EvmosRESTEndpoint<T extends EvmosRESTMethod> = EvmosRESTDatas[T] extends {
    endpoint: infer E
}
    ? E
    : never

export type EvmosRESTPathParams<T extends EvmosRESTMethod> = EvmosRESTDatas[T] extends {
    pathParams: infer E
}
    ? E
    : never

export type EvmosRESTQueryParams<T extends EvmosRESTMethod> = EvmosRESTDatas[T] extends {
    queryParams: infer E
}
    ? E
    : never

type PathParam<
    T extends EvmosRESTMethod,
    E extends keyof EvmosRESTDatas[T]['pathParams']
> = RESTDatas[T]['pathParams'][E]

type MethodsThatHasToBeRedefined = 'balance' | 'inflation'

export type EvmosRESTDatas = Omit<RESTDatas, MethodsThatHasToBeRedefined> & {
    /** Queries the balance of a single coin for a single account. */
    balance: {
        endpoint: `/cosmos/bank/v1beta1/balances/${PathParam<'balance', 'address'>}/by_denom`
        pathParams: {
            /** The address to query balances for. */
            address: string
        }
        queryParams: {
            /** The coin denom to query balances for. */
            denom: string
        }
        response: RESTDatas['balance']
    }

    /** Returns the current minting inflation value. */
    inflation: {
        endpoint: `/evmos/inflation/v1/inflation_rate`
        pathParams: undefined
        queryParams: undefined
        response: RESTDatas['inflation']
    }
}
