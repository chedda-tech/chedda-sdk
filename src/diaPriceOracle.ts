import { ethers, Contract } from 'ethers'
import DIAPriceFeed from './artifacts/DIAPriceFeed.json'

export class DIAPriceOracle {
  public contract!: Contract

  constructor(
    private provider: ethers.JsonRpcProvider,
    private address: string,
  ) {
    this.initializeContract()
  }

  private initializeContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, DIAPriceFeed.abi, this.provider)
  }

  async readPrice(address: string) {
    return await this.contract.readPrice(address)
  }

  async decimals(): Promise<number> {
    return await this.contract.decimals()
  }

  async token(): Promise<string> {
    return await this.contract.token()
  }
}
