# Scripts
This folder includes scripts which we need to develop the SDK.

## generate-chains.js
The script reads all the files inside `sdk/cosmos_chains/` folder.

Then it parses them, and generates TypeScript objects.

Lastly it generates content for `sdk/src/cosmos/chain-infos.ts`, and saves it.

### Usage
Set current directory to `sdk/`.
```sh
cd sdk
```
Run the script.
```sh
yarn run generate-chains
```