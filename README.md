```
   ____                      ___      _    __
  / __/__  ___ ________ ____/ _ )____(_)__/ /__ ____
 _\ \/ _ \/ _ `/ __/ -_)___/ _  / __/ / _  / _ `/ -_)
/___/ .__/\_,_/\__/\__/   /____/_/ /_/\_,_/\_, /\__/
   /_/                                    /___/

```

#Overview

Microservice for Payment Gateways

## Setting up the development environment

You will need:

- [Yarn](https://yarnpkg.com/lang/en/docs/install)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
- [VS Code](https://code.visualstudio.com/download) (recommended)

Once everything is installed, run `yarn` to install the node packages. See `./packages.json` for scripts.

```bash
yarn
```

## Running the development server

Run the mongoDB server for development.

```bash
cd ./environments/development
./mongo run
```

Then start the development server from **project root**:

```bash
yarn dev
```
