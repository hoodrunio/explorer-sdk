import { ChainInfo, ChainPrefixes, ChainURLs } from '../types/globals'
import { RPCEndpoint, RPCMethod, RPCParams, RPCResponseResult, RPCResult } from '../types/rpc/rpc'
import fetch from 'node-fetch'
import {
    RESTEndpoint,
    RESTMethod,
    RESTPathParams,
    RESTQueryParams,
    RESTResponse,
    RESTSuccessResponse,
} from '../types/rest/cosmos-44'

export class Cosmos44Chain {
    constructor(info: ChainInfo) {
        this.name = info.name
        this.urls = info.urls
        this.prefixes = info.prefixes
        this.decimals = info.decimals
    }

    /** The name of the chain. */
    readonly name: string

    /** URLs for the chain. */
    readonly urls: ChainURLs

    /** The prefixes for the chain. */
    readonly prefixes: ChainPrefixes

    /** Decimals of the native token of the chain. */
    readonly decimals: number

    /**
     * Makes an RPC request to the RPC server at `endpoint`, with `queryParams`. \
     * Returns the result of the server response. \
     * Use it to create RPC methods.
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
        endpoint: RPCEndpoint<T>,
        queryParams: RPCParams<T>
    ): Promise<RPCResult<T>> {
        try {
            // Create a variable to hold queryParams.
            let query = ''

            // Do below, if typeof `params` isn't `'undefined`.
            if (typeof queryParams !== 'undefined') {
                // Get all the parameter keys and values.
                const keysAndValues = Object.entries(queryParams as { [key in string]: unknown })

                // Do below, if there are keys & values.
                if (keysAndValues.length > 0) {
                    // Set query parameters.
                    query =
                        '?' +
                        keysAndValues
                            .map(([key, value]) =>
                                typeof value === 'undefined' ? '' : `${key}=${value}`
                            )
                            .join('&')
                }
            }

            // Make a request to the RPC server.
            const response = await fetch(`${this.urls.rpc}${endpoint}${query}`)

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

    /**
     * Makes an GET request to the REST API server at `endpoint`, with `queryParams`. \
     * Returns the result of the server response. \
     * Use it to create REST API methods.
     *
     * ## Usage
     * ```ts
     * // Returns proposal details based on `proposalId`.
     * async getProposal({ proposalId }: RESTPathParams<'proposalById'>) {
     *     return this.restGetRequest(`/cosmos/gov/v1beta1/proposals/${proposalId}`, undefined)
     * }
     * ```
     */
    protected async restGetRequest<T extends RESTMethod>(
        endpoint: RESTEndpoint<T>,
        queryParams: RESTQueryParams<T>
    ): Promise<RESTSuccessResponse<T>> {
        try {
            // Create a variable to hold queryParams.
            let query = ''

            // Do below, if typeof `params` isn't `'undefined`.
            if (typeof queryParams !== 'undefined') {
                // Get all the parameter keys and values.
                const keysAndValues = Object.entries(queryParams as { [key in string]: unknown })

                // Do below, if there are keys & values.
                if (keysAndValues.length > 0) {
                    // Set query parameters.
                    query =
                        '?' +
                        keysAndValues
                            .map(([key, value]) =>
                                typeof value === 'undefined' ? '' : `${key}=${value}`
                            )
                            .join('&')
                }
            }

            // Make a request to the RPC server.
            const response = await fetch(`${this.urls.rest}${endpoint}${query}`)

            // Return an error, if the response is not OK.
            if (!response.ok) {
                throw new Error(`RPC Error. Status: ${response.status}`)
            }

            // Parse response as a JSON object.
            const json = (await response.json()) as RESTResponse<T>

            // Return an error, if response has an error.
            if (json.message) {
                throw new Error(`RPC Error. Message: ${json.message}`)
            }

            // Successfully return the result of the response JSON object.
            return json as RESTSuccessResponse<T>
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

    /** Returns all proposals based on given status. */
    async getProposals({ ...query }: RESTQueryParams<'proposals'>) {
        return this.restGetRequest<'proposals'>(
            `/cosmos/gov/v1beta1/proposals`,
            query
        )
    }

    /** Returns proposal details based on `proposalId`. */
    async getProposal({ proposalId }: RESTPathParams<'proposalById'>) {
        return this.restGetRequest<'proposalById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}`,
            undefined
        )
    }

    /** Returns proposal deposits based on `proposalId`. */
    async getProposalDeposits({
        proposalId,
        ...query
    }: RESTPathParams<'proposalDepositsById'> & RESTQueryParams<'proposalDepositsById'>) {
        return this.restGetRequest<'proposalDepositsById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits`,
            query
        )
    }

    /** Returns proposal depositor based on `proposalId` & `depositor`. */
    async getProposalDepositor({ proposalId, depositor }: RESTPathParams<'proposalDepositorById'>) {
        return this.restGetRequest<'proposalDepositorById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits/${depositor}`,
            undefined
        )
    }

    /** Returns proposal tally based on `proposalId`. */
    async getProposalTally({ proposalId }: RESTPathParams<'proposalTallyById'>) {
        return this.restGetRequest<'proposalTallyById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/tally`,
            undefined
        )
    }

    /** Returns proposal votes based on `proposalId`. */
    async getProposalVotes({
        proposalId,
        ...query
    }: RESTPathParams<'proposalVotesById'> & RESTQueryParams<'proposalVotesById'>) {
        return this.restGetRequest<'proposalVotesById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/votes`,
            query
        )
    }

    /** Returns proposal voter based on `proposalId` & `voter`. */
    async getProposalVoter({ proposalId, voter }: RESTPathParams<'proposalVoterById'>) {
        return this.restGetRequest<'proposalVoterById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${voter}`,
            undefined
        )
    }

    /** Returns the parameters of slashing module. */
    async getSlashingParams() {
        return this.restGetRequest<'slashingParams'>(
            `/cosmos/slashing/v1beta1/params`,
            undefined
        )
    }

    /** Returns signing info of all validators. */
    async getSlashingSigningInfos({ ...query }: RESTQueryParams<'slashingSigningInfos'>) {
        return this.restGetRequest<'slashingSigningInfos'>(
            `/cosmos/slashing/v1beta1/signing_infos`,
            query
        )
    }

    /** Returns the signing info of given cons address. */
    async getSlashingSigningInfoByConsAddress({ consAddress }: RESTPathParams<'slashingSigningInfoByConsAddress'>) {
        return this.restGetRequest<'slashingSigningInfoByConsAddress'>(
            `/cosmos/slashing/v1beta1/signing_infos/${consAddress}`,
            undefined
        )
    }

    /** Returns all evidence. */
    async getAllEvidence({ ...query }: RESTQueryParams<'allEvidence'>) {
        return this.restGetRequest<'allEvidence'>(
            `/cosmos/evidence/v1beta1/evidence`,
            query
        )
    }

    /** Returns evidence based on evidence hash. */
    async getEvidenceByHash({ evidenceHash }: RESTPathParams<'evidenceByHash'>) {
        return this.restGetRequest<'evidenceByHash'>(
            `/cosmos/evidence/v1beta1/evidence/${evidenceHash}`,
            undefined
        )
    }

    /** Returns the balance of all coins for a single account. */
    async getBalances({
        address,
        ...query
    }: RESTPathParams<'balances'> & RESTQueryParams<'balances'>) {
        return this.restGetRequest<'balances'>(
            `/cosmos/bank/v1beta1/balances/${address}`,
            query
        )
    }

    /** Returns the balance of a single coin for a single account. */
    async getBalance({ address, denom }: RESTPathParams<'balance'>) {
        return this.restGetRequest<'balance'>(
            `/cosmos/bank/v1beta1/balances/${address}/${denom}`,
            undefined
        )
    }

    /** Returns the staking parameters. */
    async getStakingParams() {
        return this.restGetRequest<'stakingParams'>(
            `/cosmos/staking/v1beta1/params`,
            undefined
        )
    }

    /** Returns the parameters of x/bank module. */
    async getBankParams() {
        return this.restGetRequest<'bankParams'>(
            `/cosmos/bank/v1beta1/params`,
            undefined
        )
    }

    /** Returns the parameters of distribution module. */
    async getDistributionParams() {
        return this.restGetRequest<'distributionParams'>(
            `/cosmos/distribution/v1beta1/params`,
            undefined
        )
    }

    /** Returns the parameters of auth module. */
    async getAuthParams() {
        return this.restGetRequest<'authParams'>(
            `/cosmos/auth/v1beta1/params`,
            undefined
        )
    }

    /** Returns the total supply of all coins. */
    async getSupplies({ ...query }: RESTQueryParams<'supplies'>) {
        return this.restGetRequest<'supplies'>(
            `/cosmos/bank/v1beta1/supply`,
            query
        )
    }

    /** Returns the supply of a single coin. */
    async getSupply({ denom }: RESTPathParams<'supply'>) {
        return this.restGetRequest<'supply'>(
            `/cosmos/bank/v1beta1/supply/${denom}`,
            undefined
        )
    }
}
