This folder includes scripts which we need to develop the SDK.

# generate-chains.js
The script reads all the files inside `sdk/inputs/chain_info/` folder.

Then it parses them, and generates TypeScript objects.

Lastly it generates content for `sdk/src/cosmos/chain-info.ts`, and saves it.

# Usage
## Add a new chain.
Create a new YAML file (for example: `example.yaml`) inside `sdk/inputs/chain_info/` folder to add a new cosmos based chain.

> Lines start with `#` are comments, you DO NOT need them.

> Files should be named using this rule: `<lowercase-chain-name>.yaml`.

#### Example file content:
```yaml
# Name of the chain.
name: Example

# URL for the RPC.
rpc: https://rpc.example.com

# URL for the REST API.
rest: https://rest.example.com

# URL for the web socket.
socket: wss://ws.example.com/

# You can provide `decimals` if it is not `6`, otherwise it's generated automatically.
#decimals: 18

# If `prefix` is not specified, suppose it to be lowercase version of `name`.

# You can also provide `prefix`, if it isn't lowercase version of `name`.
#prefix: exam
```


## Run the script.
Set current directory to `sdk/`.
```sh
cd sdk
```
Run the script.
```sh
yarn run generate-chains
```