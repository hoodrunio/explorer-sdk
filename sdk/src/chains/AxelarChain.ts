import { Cosmos44Chain } from './Cosmos44Chain'
import { AxelarInfo } from '../chain-info'

/**
 * # Axelar
 * The class that has methods to intereact with Axelar blockchain.
 */
export class AxelarChain extends Cosmos44Chain {
    constructor() {
        super(AxelarInfo)
    }
}
