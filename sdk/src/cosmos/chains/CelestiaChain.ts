import { Cosmos44Chain } from './Cosmos44Chain'
import { CelestiaInfo } from '../chain-infos'

export class CelestiaChain extends Cosmos44Chain {
    constructor() {
        super(CelestiaInfo)
    }
}
