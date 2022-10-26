import { BaseChain } from './BaseChain'
import { KyveInfo } from '../chain-infos'

export class KyveChain extends BaseChain {
    constructor() {
        super(KyveInfo)
    }
}
