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


    /** Returns the balance of a single coin for a single account. */
    async getBalanceEvmos({
        address,
        ...query
    }: RESTCosmos44PathParams<'evmosBalance'> & RESTCosmos44Params<'evmosBalance'>) {
        return this.restGetRequest<'evmosBalance'>(
            `/cosmos/bank/v1beta1/balances/${address}/by_denom`,
            query
        )
    }

    /** Returns the inflation rate of the current period. */
    async getInflationEvmos() {
        return this.restGetRequest<'evmosInflation'>(`/evmos/inflation/v1/inflation_rate`, undefined)
    }

    /** Returns the total number of tokens that are in circulation (i.e. excluding unvested tokens). */
    async getCirculatingSupplyEvmos() {
        return this.restGetRequest<'evmosCirculatingSupply'>('/evmos/inflation/v1/circulating_supply', undefined)
    }
}
