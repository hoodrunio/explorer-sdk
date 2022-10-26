export type RESTMethod = keyof RESTDatas

export interface RESTErrorResponse {
    code: string
    message: string
    details: unknown[]
}

export type RESTSuccessResponse<T extends RESTMethod> = RESTDatas[T] extends {
    queryParams: infer Q
    response: infer R
}
    ? Q extends PaginationQueryParams
        ? R & PaginationResponse
        : R
    : never

export type RESTResponse<T extends RESTMethod> =
    | (RESTSuccessResponse<T> & { message: undefined })
    | RESTErrorResponse

export type RESTEndpoint<T extends RESTMethod> = RESTDatas[T] extends {
    endpoint: infer E
}
    ? E
    : never

export type RESTPathParams<T extends RESTMethod> = RESTDatas[T] extends {
    pathParams: infer E
}
    ? E
    : never

export type RESTQueryParams<T extends RESTMethod> = RESTDatas[T] extends {
    queryParams: infer E
}
    ? E
    : never

type PathParam<
    T extends RESTMethod,
    E extends keyof RESTDatas[T]['pathParams']
> = RESTDatas[T]['pathParams'][E]

export interface RESTDatas {
    /** Queries all proposals based on given status. */
    proposals: {
        endpoint: `/cosmos/gov/v1beta1/proposals`
        pathParams: undefined
        queryParams: PaginationQueryParams & {
            /** The status of the proposals */
            proposal_status:
                | 'PROPOSAL_STATUS_UNSPECIFIED'
                | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
                | 'PROPOSAL_STATUS_PASSED'
                | 'PROPOSAL_STATUS_REJECTED'
                | 'PROPOSAL_STATUS_FAILED'
            /** The voter address for the proposals. */
            voter: string
            /** The deposit addresses from the proposals. */
            depositor: string
        }
        response: {
            proposals: Array<{
                proposal_id: string
                content: {
                    type_url: string
                    value: string
                }
                status: string
                final_tally_result: {
                    yes: string
                    abstain: string
                    no: string
                    no_with_veto: string
                }
                submit_time: string
                deposit_end_time: string
                total_deposit: Array<{
                    denom: string
                    amount: string
                }>
                voting_start_time: string
                voting_end_time: string
            }>
        }
    }

    /** Queries proposal details based on ProposalID. */
    proposalById: {
        endpoint: `/cosmos/gov/v1beta1/proposals/${PathParam<'proposalById', 'proposalId'>}`
        pathParams: {
            /** Defines the unique id of the proposal. */
            proposalId: number
        }
        queryParams: undefined
        response: {
            proposal: {
                proposal_id: string
                content: {
                    '@type': string
                    title: string
                    description: string
                }
                status: string
                final_tally_result: {
                    yes: string
                    abstain: string
                    no: string
                    no_with_veto: string
                }
                submit_time: string
                deposit_end_time: string
                total_deposit: Array<{
                    denom: string
                    amount: string
                }>
                voting_start_time: string
                voting_end_time: string
            }
        }
    }

    /** Queries all deposits of a single proposal. */
    proposalDepositsById: {
        endpoint: `/cosmos/gov/v1beta1/proposals/${PathParam<
            'proposalById',
            'proposalId'
        >}/deposits`
        pathParams: {
            /** Defines the unique id of the proposal. */
            proposalId: number
        }
        queryParams: PaginationQueryParams
        response: {
            deposits: Array<{
                proposal_id: string
                depositor: string
                amount: Array<{
                    denom: string
                    amount: string
                }>
            }>
        }
    }

    /** Queries single deposit information based proposalID, depositAddr. */
    proposalDepositorById: {
        endpoint: `/cosmos/gov/v1beta1/proposals/${PathParam<
            'proposalById',
            'proposalId'
        >}/deposits/${PathParam<'proposalDepositorById', 'depositor'>}`
        pathParams: {
            /** Defines the unique id of the proposal. */
            proposalId: number
            /** Defines the deposit addresses from the proposals. */
            depositor: string
        }
        queryParams: undefined
        response: {
            deposit: {
                proposal_id: string
                depositor: string
                amount: Array<{
                    denom: string
                    amount: string
                }>
            }
        }
    }

    /** Queries the tally of a proposal vote. */
    proposalTallyById: {
        endpoint: `/cosmos/gov/v1beta1/proposals/${PathParam<
            'proposalTallyById',
            'proposalId'
        >}/tally`
        pathParams: {
            /** Defines the unique id of the proposal. */
            proposalId: number
        }
        queryParams: undefined
        response: {
            tally: {
                yes: string
                abstain: string
                no: string
                no_with_veto: string
            }
        }
    }

    /** Queries votes of a given proposal. */
    proposalVotesById: {
        endpoint: `/cosmos/gov/v1beta1/proposals/${PathParam<
            'proposalVotesById',
            'proposalId'
        >}/votes`
        pathParams: {
            /** Defines the unique id of the proposal. */
            proposalId: number
        }
        queryParams: PaginationQueryParams
        response: {
            votes: Array<{
                proposal_id: string
                voter: string
                option: string
                options: Array<{
                    option: string
                    weight: string
                }>
            }>
        }
    }

    /** Queries voted information based on proposalID, voterAddr. */
    proposalVoterById: {
        endpoint: `/cosmos/gov/v1beta1/proposals/${PathParam<
            'proposalVoterById',
            'proposalId'
        >}/votes/${PathParam<'proposalVoterById', 'voter'>}`
        pathParams: {
            /** Defines the unique id of the proposal. */
            proposalId: number
            /** Defines the voter address for the proposals. */
            voter: string
        }
        queryParams: undefined
        response: {
            vote: {
                proposal_id: string
                voter: string
                option: string
                options: Array<{
                    option: string
                    weight: string
                }>
            }
        }
    }

    /** Queries the parameters of slashing module. */
    slashingParams: {
        endpoint: `/cosmos/slashing/v1beta1/params`
        pathParams: undefined
        queryParams: undefined
        response: {
            params: {
                signed_blocks_window: string
                min_signed_per_window: string
                downtime_jail_duration: string
                slash_fraction_double_sign: string
                slash_fraction_downtime: string
            }
        }
    }

    /** Queries signing info of all validators. */
    slashingSigningInfos: {
        endpoint: `/cosmos/slashing/v1beta1/signing_infos`
        pathParams: undefined
        queryParams: PaginationQueryParams
        response: {
            info: Array<{
                address: string
                start_height: string
                index_offset: string
                jailed_until: string
                tombstoned: boolean
                missed_blocks_counter: string
            }>
        }
    }

    /** Queries the signing info of given cons address. */
    slashingSigningInfoByConsAddress: {
        endpoint: `/cosmos/slashing/v1beta1/signing_infos/${PathParam<
            'slashingSigningInfoByConsAddress',
            'consAddress'
        >}`
        pathParams: {
            /** The address to query signing info of. */
            consAddress: string
        }
        queryParams: undefined
        response: {
            val_signing_info: {
                address: string
                start_height: string
                index_offset: string
                jailed_until: string
                tombstoned: boolean
                missed_blocks_counter: string
            }
        }
    }

    /** Queries all evidence. */
    allEvidence: {
        endpoint: `/cosmos/evidence/v1beta1/evidence`
        pathParams: undefined
        queryParams: PaginationQueryParams
        response: {
            evidence: Array<{
                '@type': string
                height: string
                time: string
                power: string
                consensus_address: string
            }>
        }
    }

    /**
     * Queries evidence based on evidence hash. \
     * FIND AN EVIDENCE HASH, then test this to find response type.
     */
    evidenceByHash: {
        endpoint: `/cosmos/evidence/v1beta1/evidence/${PathParam<'evidenceByHash', 'evidenceHash'>}`
        pathParams: {
            /** The hash of the requested evidence. */
            evidenceHash: string
        }
        queryParams: undefined
        response: unknown
    }

    /** Queries the balance of all coins for a single account. */
    balances: {
        endpoint: `/cosmos/bank/v1beta1/balances/${PathParam<'balances', 'address'>}`
        pathParams: {
            /** The address to query balances for. */
            address: string
        }
        queryParams: PaginationQueryParams
        response: {
            balances: Array<{
                denom: string
                amount: string
            }>
        }
    }

    /** Queries the balance of a single coin for a single account. */
    balance: {
        endpoint: `/cosmos/bank/v1beta1/balances/${PathParam<'balance', 'address'>}/${PathParam<
            'balance',
            'denom'
        >}`
        pathParams: {
            /** The address to query balances for. */
            address: string
            /** The coin denom to query balances for. */
            denom: string
        }
        queryParams: undefined
        response: {
            balance: {
                denom: string
                amount: string
            }
        }
    }

    /** Queries the staking parameters. */
    stakingParams: {
        endpoint: `/cosmos/staking/v1beta1/params`
        pathParams: undefined
        queryParams: undefined
        response: {
            params: {
                unbonding_time: string
                max_validators: number
                max_entries: number
                historical_entries: number
                bond_denom: string
            }
        }
    }

    /** Queries the parameters of x/bank module. */
    bankParams: {
        endpoint: `/cosmos/bank/v1beta1/params`
        pathParams: undefined
        queryParams: undefined
        response: {
            params: {
                send_enabled: Array<any>
                default_send_enabled: boolean
            }
        }
    }

    /** Queries params of the distribution module. */
    distributionParams: {
        endpoint: `/cosmos/distribution/v1beta1/params`
        pathParams: undefined
        queryParams: undefined
        response: {
            params: {
                community_tax: string
                base_proposer_reward: string
                bonus_proposer_reward: string
                withdraw_addr_enabled: boolean
            }
        }
    }

    /** Queries params of the auth module. */
    authParams: {
        endpoint: `/cosmos/auth/v1beta1/params`
        pathParams: undefined
        queryParams: undefined
        response: {
            params: {
                max_memo_characters: string
                tx_sig_limit: string
                tx_size_cost_per_byte: string
                sig_verify_cost_ed25519: string
                sig_verify_cost_secp256k1: string
            }
        }
    }

    /** Queries the total supply of all coins. */
    supplies: {
        endpoint: `/cosmos/bank/v1beta1/supply`
        pathParams: undefined
        queryParams: PaginationQueryParams
        response: {
            supply: Array<{
                denom: string
                amount: string
            }>
        }
    }

    /** Queries the supply of a single coin. */
    supply: {
        endpoint: `/cosmos/bank/v1beta1/supply/${PathParam<'supply', 'denom'>}`
        pathParams: {
            /** The coin denom to query balances for. */
            denom: string
        }
        queryParams: undefined
        response: {
            amount: {
                denom: string
                amount: string
            }
        }
    }

    /** Returns the current minting inflation value. */
    inflation: {
        endpoint: `/cosmos/mint/v1beta1/inflation`
        pathParams: undefined
        queryParams: undefined
        response: {
            /** String representing float. ParseFloat it. */
            inflation: string
        }
    }
}

/**
 * 
    do_not_use: {
        endpoint: `DO_NOT_USE_THIS`
        pathParams: {}
        queryParams: {}
        response: {}
    }
 */

export interface PaginationQueryParams {
    /** `key` is a value returned in PageResponse.next_key to begin querying the next page most efficiently. Only one of offset or key should be set. */
    'pagination.key': unknown
    /** `offset` is a numeric offset that can be used when key is unavailable. It is less efficient than using key. Only one of offset or key should be set. */
    'pagination.offset': number
    /** `limit` is the total number of results to be returned in the result page. If left empty it will default to a value to be set by each app. */
    'pagination.limit': number
    /** `count_total` is set to true to indicate that the result set should include a count of the total number of items available for pagination in UIs. count_total is only respected when offset is used. It is ignored when key is set. */
    'pagination.count_total': boolean
    /** `reverse` is set to true if results are to be returned in the descending order. */
    'pagination.reverse': boolean
}

export interface PaginationResponse {
    pagination: {
        next_key: string | null
        total: string
    }
}
