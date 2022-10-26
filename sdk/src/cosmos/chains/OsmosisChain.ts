import { Cosmos44Chain } from './Cosmos44Chain'
import { OsmosisInfo } from '../chain-infos'

export class OsmosisChain extends Cosmos44Chain {
    constructor() {
        super(OsmosisInfo)
    }
}
