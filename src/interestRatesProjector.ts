import { BigNumber, Contract, ethers, Signer } from 'ethers'
import InterestRatesProjectorArtifact from './artifacts/InterestRatesProjector.json'
import { IInterestRatesProjection } from './utils/types'

export class InterestRatesProjector {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.WebSocketProvider,
    private address: string,
    public signer: Signer,
  ) {
    this.initializeContract()
  }

  private initializeContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, InterestRatesProjectorArtifact.abi, this.provider)
  }

  async projection(interestRatesModel: string, utilizations: BigNumber[]): Promise<IInterestRatesProjection[]> {
    try {
      return await this.contract.projection(interestRatesModel, utilizations)
    } catch (error) {
      this.handleContractError(error, 'getting projection')
      throw error
    }
  }

  private handleContractError(error: any, message: string) {
    console.error(`Error in ${message}:`, error)
  }
}
