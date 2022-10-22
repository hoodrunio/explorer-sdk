export type HTTPS_URL = `https://${string}.${string}`
export type WSS_URL = `wss://${string}.${string}`
export type Endpoint = `/${string}`

export interface ChainURLs {
    rpc: HTTPS_URL,
    rest: HTTPS_URL,
    ws: WSS_URL
}


export interface ChainInfo {
    name: string
    urls: ChainURLs
}