# Swagger

An application to automatically generate TypeScript types for REST API, endpoints, params, and responses.

- The app needs `swagger.yaml` files for any chain supported in Explorer.

- This app is built with [Bun](https://bun.sh/), a fast all-in-one JavaScript runtime.

# Usage

## Install Bun.
You need to install Bun.

For MacOS, or Linux:
```
curl -fsSL https://bun.sh/install | bash
```
> Bun doesn't support Windows, yet.

This project was created using `bun init` in bun v0.2.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Set current working directory.
Make sure to set working directory to `sdk/` folder in project folder.

## Prepare swagger files.
Each swagger file must be inside `sdk/inputs/swagger_info` folder. 

You must install every `swagger.yaml` or `swagger.yml` file for each chain.

Rename them based on chain names, using lowercase letters.

For example: `evmos.yaml`, `osmosis.yaml`, `axelar.yaml`, etc.

PLEASE DO NOT TOUCH `default.yaml`, as it is for Cosmos SDK itself.

## Run Swagger app.
Type below in your favorite terminal.
```
yarn run swagger
```
> Don't forget to set `cd` to `sdk/` folder in project folder.


## Check terminal message.
If it printed `Successfully finished!`, well done!

If it printed another message, an error is occured. Get help from [Berzan](https://github.com/BerzanXYZ).
