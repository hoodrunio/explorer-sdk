import { ChainInfo, ChainURLs } from '../types/globals'
import {
    RPCEndpoint,
    RPCMethod,
    RPCParams,
    RPCResponseResult,
    RPCResult,
} from '../types/rpc/rpc'
import fetch from 'node-fetch'

export class BaseChain {
    constructor(info: ChainInfo) {
        this.name = info.name

        this.urls = info.urls
    }

    /** The name of the chain. */
    readonly name: string

    /** URLs for the chain. */
    readonly urls: ChainURLs

    /**
     * Makes an RPC request to the RPC server at `path`, with `params`. \
     * Returns the result of the server response.
     *
     * ## Usage
     * ```ts
     * // Returns node heartbeat.
     * async getRpcHealth() {
     *     return this.rpcRequest<'health'>('​/health', undefined)
     * }
     * ```
     */
    protected async rpcRequest<T extends RPCMethod>(
        path: RPCEndpoint<T>,
        params: RPCParams<T>
    ): Promise<RPCResult<T>> {
        try {
            // Create a variable to hold queryParams.
            let queryParams = ''

            // Do below, if typeof `params` isn't `'undefined`.
            if (typeof params !== 'undefined') {
                // Get all the parameter keys and values.
                const keysAndValues = Object.entries(params as { [key in string]: unknown })

                // Do below, if there are keys & values.
                if (keysAndValues.length > 0) {
                    // Set query parameters.
                    queryParams =
                        '?' +
                        keysAndValues
                            .map(([key, value]) =>
                                typeof value === 'undefined' ? '' : `${key}=${value}`
                            )
                            .join('&')
                }
            }

            // Make a request to the RPC server.
            const response = await fetch(`${this.urls.rpc}${path}${queryParams}`)

            // Return an error, if the response is not OK.
            if (!response.ok) {
                throw new Error(`RPC Error. Status: ${response.status}`)
            }

            // Parse response as a JSON object.
            const json = (await response.json()) as RPCResponseResult<T>

            // Return an error, if response has an error.
            if (json.error) {
                throw new Error(`RPC Error. Message: ${json.error}`)
            }

            // Successfully return the result of the response JSON object.
            return json.result as RPCResult<T>
        } catch (error) {
            console.error(`LOOK AT THE ERROR BELOW:\n${error}`)
            throw new Error(`RPC Error.`)
        }
    }

    /** Returns node heartbeat. */
    async getHealth() {
        return this.rpcRequest<'health'>('/health', undefined)
    }

    /** Returns node status. */
    async getStatus() {
        return this.rpcRequest<'status'>('/status', undefined)
    }

    /** Returns network informations. */
    async getNetInfo() {
        return this.rpcRequest<'netInfo'>('/net_info', undefined)
    }

    /** Returns the block headers between `minHeight` and `maxHeight`. (max: 20) */
    async getBlockchain(params: RPCParams<'blockchain'>) {
        return this.rpcRequest<'blockchain'>('/blockchain', params)
    }

    /**
     * Returns the block at `height`, if `height` is given. \
     * Returns the latest block, if `height` is not given.
     */
    async getBlock(params: RPCParams<'block'>) {
        return this.rpcRequest<'block'>('/block', params)
    }

    /** Returns the block associated with `hash`. */
    async getBlockByHash(params: RPCParams<'blockByHash'>) {
        return this.rpcRequest<'blockByHash'>('/block_by_hash', params)
    }

    /**
     * Returns the results of the block at `height`, if `height` is given. \
     * Returns the results of the latest block, if `height` is not given.
     */
    async getBlockResults(params: RPCParams<'blockResults'>) {
        return this.rpcRequest<'blockResults'>('/block_results', params)
    }

    /**
     * Returns the commit results of the block at `height`, if `height` is given. \
     * Returns the commit results of the latest block, if `height` is not given.
     */
    async getCommit(params: RPCParams<'commit'>) {
        return this.rpcRequest<'commit'>('/commit', params)
    }

    /**
     * Returns the validator set of the block at `height`, if `height` is given. \
     * Returns the validator set of the latest block, if `height` is not given.
     */
    async getValidators(params: RPCParams<'validators'>) {
        return this.rpcRequest<'validators'>('/validators', params)
    }

    /** Returns the genesis. */
    async getGenesis() {
        return this.rpcRequest<'genesis'>('/genesis', undefined)
    }

    /** Returns the dump consensus state. */
    async getDumpConsensusState() {
        return this.rpcRequest<'dumpConsensusState'>('/dump_consensus_state', undefined)
    }

    /** Returns the consensus state. */
    async getConsensusState() {
        return this.rpcRequest<'consensusState'>('/consensus_state', undefined)
    }

    /**
     * Returns the consensus parameters of the block at `height`, if `height` is given. \
     * Returns the consensus parameters of the latest block, if `height` is not given.
     */
    async getConsensusParams(params: RPCParams<'consensusParams'>) {
        return this.rpcRequest<'consensusParams'>('/consensus_params', params)
    }

    /** Returns `limit` pieces the list of unconfirmed transactions. (default 30) (max 100) */
    async getUnconfirmedTXs(params: RPCParams<'unconfirmedTXs'>) {
        return this.rpcRequest<'unconfirmedTXs'>('/unconfirmed_txs', params)
    }

    /** Returns data about unconfirmed transactions. */
    async getNumUnconfirmedTXs() {
        return this.rpcRequest<'numUnconfirmedTXs'>('/num_unconfirmed_txs', undefined)
    }

    /**
     * Returns the transaction search result. \
     * Read the comments of parameters, to learn how it works.
     */
    async searchTX(params: RPCParams<'txSearch'>) {
        return this.rpcRequest<'txSearch'>('/tx_search', params)
    }

    /**
     * Returns the block search result. \
     * There is no example in the docs right now. \
     * So, this one will be rechecked in the future.
     */
    async searchBlock(params: RPCParams<'blockSearch'>) {
        return this.rpcRequest<'blockSearch'>('/block_searchs', params)
    }

    /**
     * Returns the transaction associated with `hash`. \
     * Return value includes prove, if `prove` is true. \
     * Return value doesn't include prove, if `prove` is false. \
     * (default false)
     */
    async getTX(params: RPCParams<'consensusParams'>) {
        return this.rpcRequest<'consensusParams'>('/consensus_params', params)
    }

    /** Broadcasts `evidence` of the misbehavior. */
    async broadcastEvidence(params: RPCParams<'broadcastEvidence'>) {
        return this.rpcRequest<'broadcastEvidence'>('/broadcast_evidence', params)
    }

    /**
     * Broadcasts `tx` synchronously. \
     * Returns with the response from CheckTx. Does not wait for DeliverTx result.
     */
    async broadcastTXSync(params: RPCParams<'broadcastTXSync'>) {
        return this.rpcRequest<'broadcastTXSync'>('/broadcast_tx_sync', params)
    }

    /**
     * Broadcasts `tx` asynchronously. \
     * Returns right away, with no response. Does not wait for CheckTx nor DeliverTx results.
     */
    async broadcastTXAsync(params: RPCParams<'broadcastTXAsync'>) {
        return this.rpcRequest<'broadcastTXAsync'>('/broadcast_tx_async', params)
    }

    /**
     * Broadcasts `tx`. \
     * Returns with the responses from CheckTx and DeliverTx.
     */
    async broadcastTXCommit(params: RPCParams<'broadcastTXCommit'>) {
        return this.rpcRequest<'broadcastTXCommit'>('/broadcast_tx_commit', params)
    }

    /** Checks the transaction without executing it. */
    async checkTX(params: RPCParams<'checkTX'>) {
        return this.rpcRequest<'checkTX'>('/check_tx', params)
    }

    /** Returns information about the application. */
    async getABCIInfo() {
        return this.rpcRequest<'abciInfo'>('/abci_info', undefined)
    }

    /**
     * Query the application for some information. \
     * Read the comments of parameters, to learn how it works.
     */
    async queryABCI(params: RPCParams<'abciQuery'>) {
        return this.rpcRequest<'abciQuery'>('/abci_query', params)
    }
}
