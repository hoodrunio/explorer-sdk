# Scripts
This folder includes scripts which we need to develop the SDK.

## generate-chains.js
The script reads all the files inside `sdk/cosmos_chains/` folder.

Then it parses them, and generates TypeScript objects.

Lastly it generates content for `sdk/src/cosmos/chain-infos.ts`, and saves it.

### Usage
Create a new YAML file (for example: `example.yaml`) inside `sdk/cosmos_chains/` folder to add a new cosmos based chain.

Lines start with `#` are comments, you DO NOT need them.

Example file content:
```yaml
# Name of the chain.
name: Example

# URL for the RPC.
rpc: https://rpc.example.com

# URL for the REST API.
rest: https://rest.example.com

# URL for the web socket.
socket: wss://ws.example.com/
```

Set current directory to `sdk/`.
```sh
cd sdk
```
Run the script.
```sh
yarn run generate-chains
```