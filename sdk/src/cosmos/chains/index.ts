import { EvmosChain } from './EvmosChain'

/** Returns the wanted chain.
 *
 * ## Usage
 * ```ts
 * const chain = getChain.Evmos()
 * // or
 * const chain = getChain.Axelar()
 * // or
 * // any of the available chains.
 * ```
 */
export module getChain {
    export const Evmos = () => new EvmosChain()
}
