import { getChain } from 'sdk'

// INCOMPLETE
//
// You can easily make tests here.
// Type `yarn run test-rpc` to run this file.
// Make sure the current directory is in `tests/` folder.
(async () => {
    // We create a chain here.
    const chain = getChain.Evmos()

    // Get RPC node health.
    const health = await chain.getHealth()

    // Print it out.
    console.log('health: ', health)
})()