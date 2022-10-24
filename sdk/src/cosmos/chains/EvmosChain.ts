import { BaseChain } from './BaseChain'
import { EvmosInfo } from '../chain-infos'

export class EvmosChain extends BaseChain {
    constructor() {
        super(EvmosInfo)
    }
}
