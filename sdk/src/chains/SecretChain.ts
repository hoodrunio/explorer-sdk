import { Cosmos44Chain } from './Cosmos44Chain'
import { SecretInfo } from '../chain-info'

/**
 * # Secret
 * The class that has methods to intereact with Secret blockchain.
 */
export class SecretChain extends Cosmos44Chain {
    constructor() {
        super(SecretInfo)
    }
}
