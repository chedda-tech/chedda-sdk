import { ethers, Signer } from 'ethers'
import { ERC20Token } from './erc20Token'
import { LendingPool } from './lendingPool'
import { PriceOracle } from './priceOracle'
import { PoolLens } from './poolLens'

export class Chedda {
  provider: ethers.providers.WebSocketProvider

  constructor(provider: string) {
    this.provider = new ethers.providers.WebSocketProvider(provider)
  }

  lendingPool(address: string, signer: Signer) {
    return new LendingPool(this.provider, address, signer)
  }

  erc20token(address: string, signer: Signer) {
    return new ERC20Token(this.provider, address, signer)
  }

  poolLens(address: string, signer: Signer) {
    return new PoolLens(this.provider, address, signer)
  }

  priceOracle() {
    return new PriceOracle(this.provider)
  }

  closeProvider() {
    this.provider.destroy()
  }
}
