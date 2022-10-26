import { Cosmos44Chain } from './Cosmos44Chain'
import { EvmosInfo } from '../chain-infos'
import {
    EvmosRESTEndpoint,
    EvmosRESTMethod,
    EvmosRESTPathParams,
    EvmosRESTQueryParams,
    EvmosRESTSuccessResponse,
} from '../types/rest/chains/evmos'

export class EvmosChain extends Cosmos44Chain {
    constructor() {
        super(EvmosInfo)
    }

    protected restGetRequest<
        T extends EvmosRESTMethod,
        E = EvmosRESTEndpoint<T>,
        Q = EvmosRESTQueryParams<T>,
        R = EvmosRESTSuccessResponse<T>
    >(endpoint: E, queryParams: Q) {
        return super.restGetRequest<T, E, Q, R>(endpoint, queryParams)
    }

    async getBalance({
        address,
        ...query
    }: EvmosRESTPathParams<'balance'> & EvmosRESTQueryParams<'balance'>) {
        return this.restGetRequest<'balance'>(
            `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
            query
        )
    }

    async getInflation() {
        return this.restGetRequest<'inflation'>(`/evmos/inflation/v1/inflation_rate`, undefined)
    }
}
