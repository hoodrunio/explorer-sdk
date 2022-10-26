import { EvmosChain } from './EvmosChain'
import { KyveChain } from './KyveChain'

/** Returns the wanted chain.
 *
 * ## Usage
 * ```ts
 * const chain = getChain.Evmos()
 * // or
 * const chain = getChain.Kyve()
 * // or
 * // any of the available chains.
 * ```
 */
export module getChain {
    export const Evmos = () => new EvmosChain()
    export const Kyve = () => new KyveChain()
}
