export type RPCSuccessResponse<T> = {
    id: number
    jsonrpc: string
    result: T
    error: undefined | ''
}

export type RPCErrorResponse = {
    id: number
    jsonrpc: string
    result: undefined
    error: string
}

/** Available RPC Methods. */
export type RPCMethod = keyof RPCDatas

/** RPC endpoint paths based on `RPCMethod`. */
export type RPCEndpoint<T extends RPCMethod> = RPCDatas[T] extends {
    endpoint: infer E
}
    ? E
    : never

/** RPC parameters based on `RPCMethod`. */
export type RPCParams<T extends RPCMethod> = RPCDatas[T] extends {
    params: infer E
}
    ? E
    : never

/** RPC response result type based on `RPCMethod`. */
export type RPCResponseResult<T extends RPCMethod> = RPCDatas[T] extends {
    result: infer E
}
    ? RPCSuccessResponse<E> | RPCErrorResponse
    : never



export interface RPCDatas {
    /** Node heartbeat */
    health: {
        endpoint: '/health'
        params: undefined
        result: {}
    }
    /** Node Status */
    status: {
        endpoint: '/status'
        params: undefined
        result: {
            node_info: {
                protocol_version: {
                    p2p: string
                    block: string
                    app: string
                }
                id: string
                listen_addr: string
                network: string
                version: string
                channels: string
                moniker: string
                other: {
                    tx_index: string
                    rpc_address: string
                }
            }
            sync_info: {
                latest_block_hash: string
                latest_app_hash: string
                latest_block_height: string
                latest_block_time: string
                earliest_block_hash: string
                earliest_app_hash: string
                earliest_block_height: string
                earliest_block_time: string
                catching_up: boolean
            }
            validator_info: {
                address: string
                pub_key: {
                    type: string
                    value: string
                }
                voting_power: string
            }
        }
    }

    /** Network informations */
    netInfo: {
        endpoint: '/net_info'
        params: undefined
        result: {
            listening: boolean
            listeners: Array<string>
            n_peers: string
            peers: Array<{
                node_info: {
                    protocol_version: {
                        p2p: string
                        block: string
                        app: string
                    }
                    id: string
                    listen_addr: string
                    network: string
                    version: string
                    channels: string
                    moniker: string
                    other: {
                        tx_index: string
                        rpc_address: string
                    }
                }
                is_outbound: boolean
                connection_status: {
                    Duration: string
                    SendMonitor: {
                        Active: boolean
                        Start: string
                        Duration: string
                        Idle: string
                        Bytes: string
                        Samples: string
                        InstRate: string
                        CurRate: string
                        AvgRate: string
                        PeakRate: string
                        BytesRem: string
                        TimeRem: string
                        Progress: number
                    }
                    RecvMonitor: {
                        Active: boolean
                        Start: string
                        Duration: string
                        Idle: string
                        Bytes: string
                        Samples: string
                        InstRate: string
                        CurRate: string
                        AvgRate: string
                        PeakRate: string
                        BytesRem: string
                        TimeRem: string
                        Progress: number
                    }
                    Channels: Array<{
                        ID: number
                        SendQueueCapacity: string
                        SendQueueSize: string
                        Priority: string
                        RecentlySent: string
                    }>
                }
                remote_ip: string
            }>
        }
    }

    /** Get block headers(max: 20) for minHeight <= height <= maxHeight. */
    blockchain: {
        endpoint: '/blockchain'
        params: {
            /** Minimum block height to return. */
            minHeight: number
            /** Maximum block height to return. */
            maxHeight: number
        }
        result: {
            last_height: string
            block_metas: Array<{
                block_id: BlockID
                block_size: number
                header: {
                    version: {
                        block: string
                        app: string
                    }
                    chain_id: string
                    height: string
                    time: string
                    last_block_id: BlockID
                    last_commit_hash: string
                    data_hash: string
                    validators_hash: string
                    next_validators_hash: string
                    consensus_hash: string
                    app_hash: string
                    last_results_hash: string
                    evidence_hash: string
                    proposer_address: string
                }
                num_txs: string
            }>
        }
    }

    /** Get block at a specified height */
    block: {
        endpoint: '/block'
        params: {
            /** Height to return. If no height is provided, it will fetch the latest block. Default value: 0. */
            height?: number
        }
        result: {
            block_id: BlockID
            block: Block
        }
    }

    /** Get block by hash */
    blockByHash: {
        endpoint: '/block_by_hash'
        params: {
            /** Block hash. */
            hash: string
        }
        result: {
            block_id: BlockID
            block: Block
        }
    }

    /** Get block results at a specified height */
    blockResults: {
        endpoint: '/block_results'
        params: {
            /** Height to return. If no height is provided, it will fetch informations regarding the latest block. Default value: 0. */
            height?: number
        }
        result: {
            height: string
            txs_results: Array<{
                code: string
                data: string
                log: string
                info: string
                gas_wanted: string
                gas_used: string
                events: Array<{
                    type: string
                    attributes: Array<{
                        key: string
                        value: string
                        index: boolean
                    }>
                }>
                codespace: string
            }>
            begin_block_events: Array<{
                type: string
                attributes: Array<{
                    key: string
                    value: string
                    index: boolean
                }>
            }>
            end_block: Array<{
                type: string
                attributes: Array<{
                    key: string
                    value: string
                    index: boolean
                }>
            }>
            validator_updates: Array<{
                pub_key: {
                    type: string
                    value: string
                }
                power: string
            }>
            consensus_params_updates: {
                block: {
                    max_bytes: string
                    max_gas: string
                    time_iota_ms: string
                }
                evidence: {
                    max_age: string
                }
                validator: {
                    pub_key_types: Array<string>
                }
            }
        }
    }

    /** Get commit results at a specified height */
    commit: {
        endpoint: '/commit'
        params: {
            /** Height to return. If no height is provided, it will fetch commit informations regarding the latest block. Default value: 0. */
            height?: number
        }
        result: {
            signed_header: {
                header: {
                    version: {
                        block: string
                        app: string
                    }
                    chain_id: string
                    height: string
                    time: string
                    last_block_id: {
                        hash: string
                        parts: {
                            total: number
                            hash: string
                        }
                    }
                    last_commit_hash: string
                    data_hash: string
                    validators_hash: string
                    next_validators_hash: string
                    consensus_hash: string
                    app_hash: string
                    last_results_hash: string
                    evidence_hash: string
                    proposer_address: string
                }
                commit: {
                    height: string
                    round: number
                    block_id: {
                        hash: string
                        parts: {
                            total: number
                            hash: string
                        }
                    }
                    signatures: Array<{
                        block_id_flag: number
                        validator_address: string
                        timestamp: string
                        signature: string
                    }>
                }
            }
            canonical: boolean
        }
    }

    /** Get validator set at a specified height */
    validators: {
        endpoint: '/validators'
        params: {
            /** Height to return. If no height is provided, it will fetch validator set which corresponds to the latest block. Default value: 0. */
            height?: number
            /** Page number (1-based). If no page is provided, it will fetch the first page. Default value: 1. */
            page?: number
            /** Number of entries per page (max: 100). If no `per_page` is provided, it will only fetch 30 entries. Default value: 30. */
            per_page?: number
        }
        result: {
            block_height: string
            validators: Array<{
                address: string
                pub_key: {
                    type: string
                    value: string
                }
                voting_power: string
                proposer_priority: string
            }>
            count: string
            total: string
        }
    }

    /** Get Genesis */
    genesis: {
        endpoint: '/genesis'
        params: undefined
        result: {
            genesis: {
                genesis_time: string
                chain_id: string
                initial_height: string
                consensus_params: {
                    block: {
                        max_bytes: string
                        max_gas: string
                        time_iota_ms: string
                    }
                    evidence: {
                        max_age: string
                    }
                    validator: {
                        pub_key_types: Array<string>
                    }
                }
                validators: Array<{
                    address: string
                    pub_key: {
                        type: string
                        value: string
                    }
                    power: string
                    name: string
                }>
                app_hash: string
                app_state: {}
            }
        }
    }

    /** Get consensus state */
    dumpConsensusState: {
        endpoint: '/dump_consensus_state'
        params: undefined
        result: {
            round_state: {
                height: string
                round: number
                step: number
                start_time: string
                commit_time: string
                validators: {
                    validators: Array<{
                        address: string
                        pub_key: {
                            type: string
                            value: string
                        }
                        voting_power: string
                        proposer_priority: string
                    }>
                    proposer: {
                        address: string
                        pub_key: {
                            type: string
                            value: string
                        }
                        voting_power: string
                        proposer_priority: string
                    }
                }
                locked_round: number
                valid_round: string
                votes: Array<{
                    round: string
                    prevotes: Array<string>
                    prevotes_bit_array: string
                    precommits: Array<string>
                    precommits_bit_array: string
                }>
                commit_round: number
                last_commit: {
                    votes: Array<string>
                    votes_bit_array: string
                    peer_maj_23s: {}
                }
                last_validators: {
                    validators: Array<{
                        address: string
                        pub_key: {
                            type: string
                            value: string
                        }
                        voting_power: string
                        proposer_priority: string
                    }>
                    proposer: {
                        address: string
                        pub_key: {
                            type: string
                            value: string
                        }
                        voting_power: string
                        proposer_priority: string
                    }
                }
                triggered_timeout_precommit: boolean
            }
            peers: Array<{
                node_address: string
                peer_state: {
                    round_state: {
                        height: string
                        round: string
                        step: number
                        start_time: string
                        proposal: boolean
                        proposal_block_parts_header: {
                            total: number
                            hash: string
                        }
                        proposal_pol_round: number
                        proposal_pol: string
                        prevotes: string
                        precommits: string
                        last_commit_round: number
                        last_commit: string
                        catchup_commit_round: number
                        catchup_commit: string
                    }
                    stats: {
                        votes: string
                        block_parts: string
                    }
                }
            }>
        }
    }

    /** Get consensus state */
    consensusState: {
        endpoint: '/consensus_state'
        params: undefined
        result: {
            round_state: {
                'height/round/step': string
                start_time: string
                proposal_block_hash: string
                locked_block_hash: string
                valid_block_hash: string
                height_vote_set: Array<{
                    round: number
                    prevotes: Array<string>
                    prevotes_bit_array: string
                    precommits: Array<string>
                    precommits_bit_array: string
                }>
                proposer: {
                    address: string
                    index: number
                }
            }
        }
    }

    /** Get consensus parameters */
    consensusParams: {
        endpoint: '/consensus_params'
        params: {
            /** Height to return. If no height is provided, it will fetch commit informations regarding the latest block. Default value: 0. */
            height?: number
        }
        result: {
            block_height: string
            consensus_params: {
                block: {
                    max_bytes: string
                    max_gas: string
                    time_iota_ms: string
                }
                evidence: {
                    max_age: string
                }
                validator: {
                    pub_key_types: Array<string>
                }
            }
        }
    }

    /** Get the list of unconfirmed transactions */
    unconfirmedTXs: {
        endpoint: '/unconfirmed_txs'
        params: {
            /** Maximum number of unconfirmed transactions to return (max 100). Default value: 30. */
            limit?: number
        }
        result: {
            n_txs: string
            total: string
            total_bytes: string
            txs: Array<string>
        }
    }

    /** Get data about unconfirmed transactions */
    numUnconfirmedTXs: {
        endpoint: '/num_unconfirmed_txs'
        params: undefined
        result: {
            n_txs: string
            total: string
            total_bytes: string
        }
    }

    /** Search for transactions */
    txSearch: {
        endpoint: '/tx_search'
        params: {
            /** Query. For example: `tx.height=1000`. */
            query: string
            /** Include proofs of the transactions inclusion in the block. */
            prove: boolean
            /** Page number (1-based). */
            page: number
            /** Number of entries per page (max: 100). */
            per_page: number
            /** Order in which transactions are sorted ("asc" or "desc"), by height & index. If empty, default sorting will be still applied. */
            order_by: 'asc' | 'desc'
        }
        result: {
            txs: Array<{
                hash: string
                height: string
                index: number
                tx_result: {
                    log: string
                    gas_wanted: string
                    gas_used: string
                    tags: {
                        key: string
                        value: string
                        index: boolean
                    }
                }
                tx: string
                proof: {
                    RootHash: string
                    Data: string
                    Proof: {
                        total: string
                        index: string
                        leaf_hash: string
                        aunts: Array<string>
                    }
                }
            }>
            total_count: string
        }
    }

    /** Search for blocks by BeginBlock and EndBlock events. `TODO!` */
    blockSearch: {
        endpoint: '/block_searchs'
        params: {
            /** Query. For example: `block.height > 1000 AND valset.changed > 0`. */
            query: string
            /** Page number (1-based). Default value: 1. */
            page?: number
            /** Number of entries per page (max: 100). Default value: 30. */
            per_page?: number
            /** Order in which blocks are sorted ("asc" or "desc"), by height. If empty, default sorting will be still applied. Default value: desc. */
            order_by?: 'asc' | 'desc'
        }
        result: {
            THERE_IS_NO_EXAMPLE_GIVEN: unknown
            TO_DO: unknown
        }
    }

    /** Get transactions by hash */
    tx: {
        endpoint: '/tx'
        params: {
            /** Transaction hash to retrive. */
            hash: string
            /** Include proofs of the transactions inclusion in the block. Default value: false. */
            prove?: boolean
        }
        result: {
            hash: string
            height: string
            index: number
            tx_result: {
                log: string
                gas_wanted: string
                gas_used: string
                tags: Array<{
                    key: string
                    value: string
                    index: boolean
                }>
            }
            tx: string
        }
    }

    /** Broadcast evidence of the misbehavior. */
    broadcastEvidence: {
        endpoint: '/broadcast_evidence'
        params: {
            /** JSON evidence. For example: `JSON_EVIDENCE_encoded`. */
            evidence: string
        }
        result: string
    }

    /** Returns with the response from CheckTx. Does not wait for DeliverTx result. */
    broadcastTXSync: {
        endpoint: '/broadcast_tx_sync'
        params: {
            /** The transaction. */
            tx: string
        }
        result: {
            code: string
            data: string
            log: string
            codespace: string
            hash: string
        }
    }

    /** Returns right away, with no response. Does not wait for CheckTx nor DeliverTx results. */
    broadcastTXAsync: {
        endpoint: '/broadcast_tx_async'
        params: {
            /** The transaction. */
            tx: string
        }
        result: {
            code: string
            data: string
            log: string
            codespace: string
            hash: string
        }
    }

    /** Returns with the responses from CheckTx and DeliverTx. */
    broadcastTXCommit: {
        endpoint: '/broadcast_tx_commit'
        params: {
            /** The transaction. */
            tx: string
        }
        result: {
            height: string
            hash: string
            deliver_tx: {
                log: string
                data: string
                code: string
            }
            check_tx: {
                log: string
                data: string
                code: string
            }
        }
    }

    /** Checks the transaction without executing it. */
    checkTX: {
        endpoint: '/check_tx'
        params: {
            /** The transaction. */
            tx: string
        }
        result: {
            code: string
            data: string
            log: string
            info: string
            gas_wanted: string
            gas_used: string
            events: Array<{
                type: string
                attributes: Array<{
                    key: string
                    value: string
                    index: boolean
                }>
            }>
            codespace: string
        }
    }

    /** Get some info about the application. */
    abciInfo: {
        endpoint: '/abci_info'
        params: undefined
        result: {
            response: {
                data: string
                version: string
                app_version: string
            }
        }
    }

    /** Query the application for some information. */
    abciQuery: {
        endpoint: '/abci_query'
        params: {
            /** Path to the data ("/a/b/c"). For example: `/a/b/c`. */
            path: string
            /** Data. For example: `IHAVENOIDEA`. */
            data: string
            /** Height (0 means latest). Default value : 0. */
            height?: number
            /** Include proofs of the transactions inclusion in the block. Default value: false. */
            prove?: boolean
        }
        result: {
            log: string
            height: string
            proof: string
            value: string
            key: string
            index: string
            code: string
        }
    }
}

interface BlockID {
    hash: string
    parts: {
        total: number
        hash: string
    }
}

interface Block {
    header: {
        version: {
            block: string
            app: string
        }
        chain_id: string
        height: string
        time: string
        last_block_id: {
            hash: string
            parts: {
                total: number
                hash: string
            }
        }
        last_commit_hash: string
        data_hash: string
        validators_hash: string
        next_validators_hash: string
        consensus_hash: string
        app_hash: string
        last_results_hash: string
        evidence_hash: string
        proposer_address: string
    }
    data: Array<string>
    evidence: Array<{
        type: string
        height: number
        time: number
        total_voting_power: number
        validator: {
            pub_key: {
                type: string
                value: string
            }
            voting_power: number
            address: string
        }
    }>
    last_commit: {
        height: number
        round: number
        block_id: {
            hash: string
            parts: {
                total: number
                hash: string
            }
        }
        signatures: Array<{
            type: number
            height: string
            round: number
            block_id: {
                hash: string
                parts: {
                    total: number
                    hash: string
                }
            }
            timestamp: string
            validator_address: string
            validator_index: number
            signature: string
        }>
    }
}
