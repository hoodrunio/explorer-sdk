export type RESTMethod = keyof RESTDatas

export interface RESTErrorResponse {
    code: string
    message: string
    details: unknown[]
}

export type RESTSuccessResponse<T extends RESTMethod> = RESTDatas[T] extends {
    response: infer E
}
    ? E
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
        queryParams: {
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
        response: {
            deposits: Array<{
                proposal_id: string
                depositor: string
                amount: Array<{
                    denom: string
                    amount: string
                }>
            }>
            pagination: {
                next_key: null | unknown
                total: string
            }
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
        queryParams: {
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
            pagination: {
                next_key: string
                total: string
            }
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

    any: {
        endpoint: '////////////////'
        pathParams: {}
        queryParams: {}
        response: {}
    }
}