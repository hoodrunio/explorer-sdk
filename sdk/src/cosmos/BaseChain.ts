import { ChainInfo, ChainURLs } from './types/globals'

export class BaseChain {
    constructor(info: ChainInfo) {
        this.name = info.name

        this.urls = info.urls
    }

    readonly name: string

    readonly urls: ChainURLs

    readonly request = {}
}
