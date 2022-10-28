# SDK

This SDK is for the upcoming Explorer.

-   It will support all the RPC methods.

-   It will support all the REST API methods.

-   It will support all the Web Socket methods.

# Roadmap

✅ Make a prototype for all RPC methods.

🏗️ Make a prototype for REST API methods of Cosmos SDK v0.44.

🏗️ Make prototypes for REST API methods of chains using Cosmos SDK.

❌ Make a prototype for REST API methods of Cosmos SDK v0.45.

❌ Make an exact list for all Web Socket methods including uncommon ones.

❌ Make a prototype for Web Socket methods.

# To Know


## Add a new chain.


### Add information.
Create a new YAML file in `sdk/inputs/chain_info/` folder, according to `example.yaml` to add a new chain support.

The content of `example.yaml`:

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

-   Type below, to generate TypeScript objects for the new chain.
    Make sure the current directory is in `sdk/` folder.

```
yarn generate-chains
```

-   Type below to create a bundle for the SDK.
    Make sure the current directory is in `sdk/` folder.

```
yarn run build
```

### Add REST API methods.
Each swagger file must be inside `sdk/inputs/swagger_info` folder. 

Install `swagger.yaml` or `swagger.yml` file for the chain.

Rename it based on chain names, using lowercase letters.

For example: `evmos.yaml`, `osmosis.yaml`, `axelar.yaml`, etc.

PLEASE DO NOT TOUCH `default.yaml`, as it is for Cosmos SDK itself.

Type below to generate REST API method definitions.
```
yarn run generate-swagger
```