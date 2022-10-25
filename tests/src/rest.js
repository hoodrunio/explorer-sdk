import { getChain } from 'sdk'

// INCOMPLETE
//
// You can easily make tests here.
// Type `yarn run test-rest` to run this file.
// Make sure the current directory is in `tests/` folder.
(async () => {
    // We create a chain here.
    const chain = getChain.Evmos()

    // Get the proposal that has an ID of 1.
    const proposal = await chain.getProposal({
        proposalId: 1,
    })

    // Print it out.
    console.log(`PROPOSAL ID: ${proposal.proposal.proposal_id}`)
    console.log(`PROPOSAL TITLE: ${proposal.proposal.content.title}`)
    console.log(`PROPOSAL DESCRIPTION: ${proposal.proposal.content.description}`)
})()