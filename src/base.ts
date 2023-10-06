import { ethers, Signer } from 'ethers'
import { TokenService } from './token'
import { CheddaVault } from './vault'
import { PriceOracle } from './priceOracle'

export class Chedda {
  provider: ethers.providers.WebSocketProvider

  constructor(provider: string) {
    this.provider = new ethers.providers.WebSocketProvider(provider)
  }

  vault(address: string, signer: Signer) {
    return new CheddaVault(this.provider, address, signer)
  }

  token(address: string, signer: Signer) {
    return new TokenService(this.provider, address, signer)
  }

  priceOracle() {
    return new PriceOracle(this.provider)
  }

  closeProvider() {
    this.provider.destroy()
  }
}
