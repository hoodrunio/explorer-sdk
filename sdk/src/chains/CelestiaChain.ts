import { Cosmos44Chain } from './Cosmos44Chain'
import { CelestiaInfo } from '../chain-info'
/**
 * # Celestia
 * The class that has methods to intereact with Celestia blockchain.
 */
export class CelestiaChain extends Cosmos44Chain {
    constructor() {
        super(CelestiaInfo)
    }
}
