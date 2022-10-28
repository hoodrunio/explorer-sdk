import { ChainInfo, ChainPrefixes, ChainURLs } from '../types/globals'
import { RPCEndpoint, RPCMethod, RPCParams, RPCResponseResult, RPCResult } from '../types/rpc/rpc'
import fetch from 'node-fetch'
import {
    RESTCosmos44Endpoint,
    RESTMethod,
    RESTCosmos44PathParams,
    RESTCosmos44Params,
    RESTCosmos44Response,
    RESTCosmos44SuccessResponse,
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
    protected async restGetRequest<
        T extends RESTMethod,
        E = RESTCosmos44Endpoint<T>,
        Q = RESTCosmos44Params<T>,
        R = RESTCosmos44SuccessResponse<T>
    >(endpoint: E, queryParams: Q): Promise<R> {
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
            const json = (await response.json()) as RESTCosmos44Response<T>

            // Return an error, if response has an error.
            if (json.message) {
                throw new Error(`RPC Error. Message: ${json.message}`)
            }

            // Successfully return the result of the response JSON object.
            return json as R
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
    async getProposals({ ...query }: RESTCosmos44Params<'proposals'>) {
        return this.restGetRequest<'proposals'>(`/cosmos/gov/v1beta1/proposals`, query)
    }

    /** Returns proposal details based on `proposalId`. */
    async getProposal({ proposalId }: RESTCosmos44PathParams<'proposalById'>) {
        return this.restGetRequest<'proposalById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}`,
            undefined
        )
    }

    /** Returns proposal deposits based on `proposalId`. */
    async getProposalDeposits({
        proposalId,
        ...query
    }: RESTCosmos44PathParams<'proposalDepositsById'> &
        RESTCosmos44Params<'proposalDepositsById'>) {
        return this.restGetRequest<'proposalDepositsById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits`,
            query
        )
    }

    /** Returns proposal depositor based on `proposalId` & `depositor`. */
    async getProposalDepositor({
        proposalId,
        depositor,
    }: RESTCosmos44PathParams<'proposalDepositorById'>) {
        return this.restGetRequest<'proposalDepositorById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/deposits/${depositor}`,
            undefined
        )
    }

    /** Returns proposal tally based on `proposalId`. */
    async getProposalTally({ proposalId }: RESTCosmos44PathParams<'proposalTallyById'>) {
        return this.restGetRequest<'proposalTallyById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/tally`,
            undefined
        )
    }

    /** Returns proposal votes based on `proposalId`. */
    async getProposalVotes({
        proposalId,
        ...query
    }: RESTCosmos44PathParams<'proposalVotesById'> & RESTCosmos44Params<'proposalVotesById'>) {
        return this.restGetRequest<'proposalVotesById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/votes`,
            query
        )
    }

    /** Returns proposal voter based on `proposalId` & `voter`. */
    async getProposalVoter({ proposalId, voter }: RESTCosmos44PathParams<'proposalVoterById'>) {
        return this.restGetRequest<'proposalVoterById'>(
            `/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${voter}`,
            undefined
        )
    }

    /** Returns the parameters of slashing module. */
    async getSlashingParams() {
        return this.restGetRequest<'slashingParams'>(`/cosmos/slashing/v1beta1/params`, undefined)
    }

    /** Returns signing info of all validators. */
    async getSlashingSigningInfos({ ...query }: RESTCosmos44Params<'slashingSigningInfos'>) {
        return this.restGetRequest<'slashingSigningInfos'>(
            `/cosmos/slashing/v1beta1/signing_infos`,
            query
        )
    }

    /** Returns the signing info of given cons address. */
    async getSlashingSigningInfoByConsAddress({
        consAddress,
    }: RESTCosmos44PathParams<'slashingSigningInfoByConsAddress'>) {
        return this.restGetRequest<'slashingSigningInfoByConsAddress'>(
            `/cosmos/slashing/v1beta1/signing_infos/${consAddress}`,
            undefined
        )
    }

    /** Returns all evidence. */
    async getAllEvidence({ ...query }: RESTCosmos44Params<'allEvidence'>) {
        return this.restGetRequest<'allEvidence'>(`/cosmos/evidence/v1beta1/evidence`, query)
    }

    /** Returns evidence based on evidence hash. */
    async getEvidenceByHash({ evidenceHash }: RESTCosmos44PathParams<'evidenceByHash'>) {
        return this.restGetRequest<'evidenceByHash'>(
            `/cosmos/evidence/v1beta1/evidence/${evidenceHash}`,
            undefined
        )
    }

    /** Returns the balance of all coins for a single account. */
    async getBalances({
        address,
        ...query
    }: RESTCosmos44PathParams<'balances'> & RESTCosmos44Params<'balances'>) {
        return this.restGetRequest<'balances'>(`/cosmos/bank/v1beta1/balances/${address}`, query)
    }

    /** Returns the balance of a single coin for a single account. */
    async getBalance({ address, denom }: RESTCosmos44PathParams<'balance'>) {
        return this.restGetRequest<'balance'>(
            `/cosmos/bank/v1beta1/balances/${address}/${denom}`,
            undefined
        )
    }

    /** Returns the staking parameters. */
    async getStakingParams() {
        return this.restGetRequest<'stakingParams'>(`/cosmos/staking/v1beta1/params`, undefined)
    }

    /** Returns the parameters of x/bank module. */
    async getBankParams() {
        return this.restGetRequest<'bankParams'>(`/cosmos/bank/v1beta1/params`, undefined)
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
        return this.restGetRequest<'authParams'>(`/cosmos/auth/v1beta1/params`, undefined)
    }

    /** Returns the total supply of all coins. */
    async getSupplies({ ...query }: RESTCosmos44Params<'supplies'>) {
        return this.restGetRequest<'supplies'>(`/cosmos/bank/v1beta1/supply`, query)
    }

    /** Returns the supply of a single coin. */
    async getSupply({ denom }: RESTCosmos44PathParams<'supply'>) {
        return this.restGetRequest<'supply'>(`/cosmos/bank/v1beta1/supply/${denom}`, undefined)
    }

    /** Returns the current minting inflation value. */
    async getInflation() {
        return this.restGetRequest<'inflation'>(`/cosmos/mint/v1beta1/inflation`, undefined)
    }

    /** Returns all delegations of a given delegator address. */
    async getDelegations({
        delegatorAddress,
        ...query
    }: RESTCosmos44PathParams<'delegations'> & RESTCosmos44Params<'delegations'>) {
        return this.restGetRequest<'delegations'>(
            `/cosmos/staking/v1beta1/delegations/${delegatorAddress}`,
            query
        )
    }

    /** Returns all redelegations of a given delegator address. */
    async getRedelegations({
        delegatorAddress,
        ...query
    }: RESTCosmos44PathParams<'redelegations'> & RESTCosmos44Params<'redelegations'>) {
        return this.restGetRequest<'redelegations'>(
            `/cosmos/staking/v1beta1/delegations/${delegatorAddress}/redelegations`,
            query
        )
    }

    /** Returns all unbonding delegations of a given delegator address. */
    async getUnboundingDelegations({
        delegatorAddress,
        ...query
    }: RESTCosmos44PathParams<'unbondingDelegations'> &
        RESTCosmos44Params<'unbondingDelegations'>) {
        return this.restGetRequest<'unbondingDelegations'>(
            `/cosmos/staking/v1beta1/delegations/${delegatorAddress}/unbonding_delegations`,
            query
        )
    }

    /** Returns all validators info for given delegator address. */
    async getAllValidatorsByDelegator({
        delegatorAddress,
        ...query
    }: RESTCosmos44PathParams<'allValidatorsByDelegator'> &
        RESTCosmos44Params<'allValidatorsByDelegator'>) {
        return this.restGetRequest<'allValidatorsByDelegator'>(
            `/cosmos/staking/v1beta1/delegations/${delegatorAddress}/validators`,
            query
        )
    }

    /** Returns validator info for given delegator validator pair. */
    async getValidatorByDelegator({
        delegatorAddress,
        validatorAddress,
    }: RESTCosmos44PathParams<'validatorByDelegator'>) {
        return this.restGetRequest<'validatorByDelegator'>(
            `/cosmos/staking/v1beta1/delegations/${delegatorAddress}/validators/${validatorAddress}`,
            undefined
        )
    }

    /** Returns the historical staking info for given height. */
    async getHistoricalStakingInfo({ height }: RESTCosmos44PathParams<'historicalStakingInfo'>) {
        return this.restGetRequest<'historicalStakingInfo'>(
            `/cosmos/staking/v1beta1/historical_info/${height}`,
            undefined
        )
    }

    /** Returns the historical staking info for given height. */
    async getStakingPoolInfo() {
        return this.restGetRequest<'stakingPoolInfo'>(`/cosmos/staking/v1beta1/pool`, undefined)
    }

    /** Returns all validators that match the given status. */
    async getAllValidators({ ...query }: RESTCosmos44Params<'allValidators'>) {
        return this.restGetRequest<'allValidators'>(`/cosmos/staking/v1beta1/validators`, query)
    }

    /** Returns validator info for given validator address. */
    async getValidator({ validatorAddress }: RESTCosmos44PathParams<'validator'>) {
        return this.restGetRequest<'validator'>(
            `/cosmos/staking/v1beta1/validators/${validatorAddress}`,
            undefined
        )
    }

    /** Returns delegation info for given validator. */
    async getDelegationsByValidator({
        validatorAddress,
        ...query
    }: RESTCosmos44PathParams<'delegationsByValidator'> &
        RESTCosmos44Params<'delegationsByValidator'>) {
        return this.restGetRequest<'delegationsByValidator'>(
            `/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations`,
            query
        )
    }

    /** Returns unbonding delegation info for given validator. */
    async getUnbondingDelegationsByValidator({
        validatorAddress,
    }: RESTCosmos44PathParams<'unbondingDelegationsByValidator'>) {
        return this.restGetRequest<'unbondingDelegationsByValidator'>(
            `/cosmos/staking/v1beta1/validators/${validatorAddress}/unbonding_delegations`,
            undefined
        )
    }

    /** Returns delegation info for given validator delegator pair. */
    async getDelegationsByValidatorDelegatorPair({
        validatorAddress,
        delegatorAddress,
    }: RESTCosmos44PathParams<'delegationsByValidatorDelegatorPair'>) {
        return this.restGetRequest<'delegationsByValidatorDelegatorPair'>(
            `/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations/${delegatorAddress}`,
            undefined
        )
    }

    /** Returns unbonding delegation info for given validator delegator pair. */
    async getUnbondingDelegationsByValidatorDelegatorPair({
        validatorAddress,
        delegatorAddress,
    }: RESTCosmos44PathParams<'unbondingDelegationsByValidatorDelegatorPair'>) {
        return this.restGetRequest<'unbondingDelegationsByValidatorDelegatorPair'>(
            `/cosmos/staking/v1beta1/validators/${validatorAddress}/delegations/${delegatorAddress}/unbonding_delegations`,
            undefined
        )
    }

    /** Returns all the grants for given grantee address. */
    async getGrantsByGrantee({
        granteeAddress,
        ...query
    }: RESTCosmos44PathParams<'grantsByGrantee'> & RESTCosmos44Params<'grantsByGrantee'>) {
        return this.restGetRequest<'grantsByGrantee'>(
            `/cosmos/feegrant/v1beta1/allowances/${granteeAddress}`,
            query
        )
    }

    /** Returns fee granted to the grantee by the granter. */
    async getGrantsByGranteeGranterPair({
        granterAddress,
        granteeAddress,
    }: RESTCosmos44PathParams<'grantsByGranteeGranterPair'>) {
        return this.restGetRequest<'grantsByGranteeGranterPair'>(
            `/cosmos/feegrant/v1beta1/allowances/${granterAddress}/${granteeAddress}`,
            undefined
        )
    }

    /** Returns a list of `Authorization`, granted to the grantee by the granter. */
    async getAuthorizationsByGranteeGranterPair({
        ...query
    }: RESTCosmos44Params<'authorizationsByGranteeGranterPair'>) {
        return this.restGetRequest<'authorizationsByGranteeGranterPair'>(
            `/cosmos/authz/v1beta1/grants`,
            query
        )
    }

    /** Returns all the existing accounts. */
    async getAllAccounts({ ...query }: RESTCosmos44Params<'allAccounts'>) {
        return this.restGetRequest<'allAccounts'>(`/cosmos/auth/v1beta1/accounts`, query)
    }

    /** Returns account details based on address. */
    async getAccountDetails({ address }: RESTCosmos44PathParams<'accountDetails'>) {
        return this.restGetRequest<'accountDetails'>(
            `/cosmos/auth/v1beta1/accounts/${address}`,
            undefined
        )
    }
}
