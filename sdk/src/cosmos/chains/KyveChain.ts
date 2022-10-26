import { Cosmos44Chain } from './Cosmos44Chain'
import { KyveInfo } from '../chain-infos'

/**
 * # Kyve
 * The class that has methods to intereact with Kyve blockchain.
 */
export class KyveChain extends Cosmos44Chain {
    constructor() {
        super(KyveInfo)
    }
}
