import { Cosmos44Chain } from './Cosmos44Chain'
import { EvmosInfo } from '../chain-info'
import { RESTCosmos44Params, RESTCosmos44PathParams } from '../types/rest/cosmos-44'
/**
 * # Evmos
 * The class that has methods to intereact with Evmos blockchain.
 */
export class EvmosChain extends Cosmos44Chain {
    constructor() {
        super(EvmosInfo)
    }


    async getBalanceEvmos({
        address,
        ...query
    }: RESTCosmos44PathParams<'evmosBalance'> & RESTCosmos44Params<'evmosBalance'>) {
        return this.restGetRequest<'evmosBalance'>(
            `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
            query
        )
    }

    async getInflationEvmos() {
        return this.restGetRequest<'evmosInflation'>(`/evmos/inflation/v1/inflation_rate`, undefined)
    }
}
