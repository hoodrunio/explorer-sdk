# SDK

This SDK is for the upcoming Explorer.

-   It will support all the RPC methods.

-   It will support all the REST API methods.

-   It will support all the Web Socket methods.

## Roadmap

✅ Make a prototype for all RPC methods.

❌ Make an exact list for all REST API methods including uncommon ones.

❌ Make 3 lists according to Cosmos SDK versions, using the old list.

❌ Make a prototype for REST API methods.

❌ Make an exact list for all Web Socket methods including uncommon ones.

❌ Make a prototype for Web Socket methods.

## To Know

-   Create a new YAML file in `sdk/cosmos_chains` folder, according to `example.yaml` to add a new chain support.

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
