import { Cosmos44Chain } from './Cosmos44Chain'
import { OsmosisInfo } from '../chain-info'

/**
 * # Osmosis
 * The class that has methods to intereact with Osmosis blockchain.
 */
export class OsmosisChain extends Cosmos44Chain {
    constructor() {
        super(OsmosisInfo)
    }
}
