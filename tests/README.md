# Tests
In this folder, there will be tests.

-   You can create a new file in `src/` folder to add a new test.
-   You can add a new script to `package.json` for any new test.


## Roadmap

❌ Write tests to improve the RPC methods of the SDK library.

❌ Write tests to improve the REST API methods of the SDK library.

❌ Write tests to improve the Web Socket methods of the SDK library.

❌ Make sure there ain't no logical mistakes inside SDK library.

## To Know

-   For each test you created inside `src/` folder, add a new script like `"test-<FILE_NAME>": "node src/<FILE_NAME>.js"`.

Example of adding `"test-example"` to `package.json`:

```json
{
  "scripts": {
    "test-example": "node src/example.js"
  },
}

```

-   Type below, to run a test.

```
yarn test-example
```
