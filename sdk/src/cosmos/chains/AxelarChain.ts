import { Cosmos44Chain } from './Cosmos44Chain'
import { AxelarInfo } from '../chain-infos'

export class AxelarChain extends Cosmos44Chain {
    constructor() {
        super(AxelarInfo)
    }
}
