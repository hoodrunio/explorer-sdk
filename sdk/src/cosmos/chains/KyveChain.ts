import { Cosmos44Chain } from './Cosmos44Chain'
import { KyveInfo } from '../chain-infos'

export class KyveChain extends Cosmos44Chain {
    constructor() {
        super(KyveInfo)
    }
}
