import { AxelarChain } from './AxelarChain'
import { CelestiaChain } from './CelestiaChain'
import { EvmosChain } from './EvmosChain'
import { KyveChain } from './KyveChain'
import { OsmosisChain } from './OsmosisChain'
import { SecretChain } from './SecretChain'

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
    /** Returns Evmos chain that you can use to make requests to the blockchain. */
    export const Evmos = () => new EvmosChain()

    /** Returns Kyve chain that you can use to make requests to the blockchain. */
    export const Kyve = () => new KyveChain()

    /** Returns Axelar chain that you can use to make requests to the blockchain. */
    export const Axelar = () => new AxelarChain()

    /** Returns Osmosis chain that you can use to make requests to the blockchain. */
    export const Osmosis = () => new OsmosisChain()

    /** Returns Celestia chain that you can use to make requests to the blockchain. */
    export const Celestia = () => new CelestiaChain()

    /** Returns Secret chain that you can use to make requests to the blockchain. */
    export const Secret = () => new SecretChain()
}
