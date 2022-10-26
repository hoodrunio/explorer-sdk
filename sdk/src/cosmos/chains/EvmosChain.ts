import { Cosmos44Chain } from './Cosmos44Chain'
import { EvmosInfo } from '../chain-infos'

export class EvmosChain extends Cosmos44Chain {
    constructor() {
        super(EvmosInfo)
    }
}
