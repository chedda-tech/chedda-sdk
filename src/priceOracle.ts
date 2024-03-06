import { ethers, Contract } from 'ethers'
import CheddaPriceFeed from './artifacts/CheddaPriceFeed.json'

export class PriceOracle {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.JsonRpcProvider,
    private address: string,
  ) {
    this.initiateContract()
  }

  private initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, CheddaPriceFeed.abi, this.provider)
  }

  async readPrice(address: string) {
    return await this.contract.readPrice(address, '0')
  }

  async decimals(): Promise<number> {
    return await this.contract.decimals()
  }

  async token(): Promise<string> {
    return await this.contract.token()
  }
}
