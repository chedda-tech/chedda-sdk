# Typescript based web3 SDK

This SDK is a JavaScript library for interacting with the Chedda platform's smart contracts and services.

## Install dependencies

To install dependencies, you can use npm or yarn:

```bash
npm install
# or
yarn install
```

### Build app

```bash
npm run build
# or
yarn build
```

### How to use

```javascript
import { Chedda } from "../dist/index.js";
import contractAbi from "./contractAbi.json" assert { type: "json" };
import { environment } from "./enviroment.js";

const provider = environment.webSocketUrl;
const chedda = new Chedda(provider);
const vault = chedda.vault();


console.log(
  vault.contractAt(
    "0xB27595Bedd063935ca146EB46ee7CaE40F696f7E",
    contractAbi.abi

  )
);
```
