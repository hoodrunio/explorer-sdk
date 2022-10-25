import { ChainInfo } from './types/globals'

export const AxelarInfo: ChainInfo = {
    name: 'Axelar',
    urls: {
        rpc: 'https://rpc.cosmos.directory/axelar',
        rest: 'https://axelar-api.polkachu.com',
        socket: 'wss://axelar-rpc.chainode.tech/websocket',
    },
    prefixes: {
        prefix: 'axelar',
        valoperPrefix: 'axelarvaloper',
        consPrefix: 'axelarvalcon',
    },
    decimals: 6,
}    


export const CelestiaInfo: ChainInfo = {
    name: 'Celestia',
    urls: {
        rpc: 'https://rpc.celestia.testnet.run',
        rest: 'https://api.celestia.testnet.run',
        socket: 'wss://rpc.celestia.testnet.run/websocket',
    },
    prefixes: {
        prefix: 'celestia',
        valoperPrefix: 'celestiavaloper',
        consPrefix: 'celestiavalcon',
    },
    decimals: 6,
}    


export const KyveInfo: ChainInfo = {
    name: 'Kyve',
    urls: {
        rpc: 'https://rpc.beta.kyve.network',
        rest: 'https://api.beta.kyve.network',
        socket: 'wss://rpc.beta.kyve.network/websocket',
    },
    prefixes: {
        prefix: 'kyve',
        valoperPrefix: 'kyvevaloper',
        consPrefix: 'kyvevalcon',
    },
    decimals: 6,
}    


export const OsmosisInfo: ChainInfo = {
    name: 'Osmosis',
    urls: {
        rpc: 'https://rpc.cosmos.directory/osmosis',
        rest: 'https://rest.cosmos.directory/osmosis',
        socket: 'wss://rpc.osmosis.interbloc.org/websocket',
    },
    prefixes: {
        prefix: 'osmosis',
        valoperPrefix: 'osmovaloper',
        consPrefix: 'osmovalcons',
    },
    decimals: 6,
}    


export const SecretInfo: ChainInfo = {
    name: 'Secret',
    urls: {
        rpc: 'https://rpc.cosmos.directory/osmosis',
        rest: 'https://rest.cosmos.directory/osmosis',
        socket: 'wss://rpc.osmosis.interbloc.org/websocket',
    },
    prefixes: {
        prefix: 'secret',
        valoperPrefix: 'secretvaloper',
        consPrefix: 'secretvalcon',
    },
    decimals: 6,
}    


export const EvmosInfo: ChainInfo = {
    name: 'Evmos',
    urls: {
        rpc: 'https://rpc.cosmos.directory/evmos',
        rest: 'https://evmos-api.polkachu.com',
        socket: 'wss://rpc.evmos.bh.rocks/websocket',
    },
    prefixes: {
        prefix: 'evmos',
        valoperPrefix: 'evmosvaloper',
        consPrefix: 'evmosvalcon',
    },
    decimals: 18,
}    
