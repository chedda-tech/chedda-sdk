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
import { Chedda } from '../dist/index.js'
import { contractAddress, address } from './constants.js'
import { environment } from './enviroment.js'
import { MockSigner } from './mockSigner.js'

const provider = environment.webSocketUrl
const signer = new MockSigner(address)
const chedda = new Chedda(provider)

const vault = chedda.vault(contractAddress, signer)

const utilization = await vault.utilization()

const depositAsset = async () => {
  await vault.depositAsset(amount, address)
}
```
