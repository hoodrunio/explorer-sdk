import { BaseChain } from './BaseChain'
import { EvmosInfo } from '../chain-infos'

class Evmos extends BaseChain {
    constructor() {
        super(EvmosInfo)
    }
}
