import { Cosmos44Chain } from './Cosmos44Chain'
import { SecretInfo } from '../chain-infos'

export class SecretChain extends Cosmos44Chain {
    constructor() {
        super(SecretInfo)
    }
}
