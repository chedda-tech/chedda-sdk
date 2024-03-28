import { BigNumber, Contract, ethers, Signer } from 'ethers'
import LockingGaugeRewardsDistributorArtifact from './artifacts/LockingGaugeRewardsDistributor.json'

export class LockingGaugeRewardsDistributor {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.JsonRpcProvider,
    private address: string,
    public signer: Signer,
  ) {
    this.initiateContract()
  }

  private initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, LockingGaugeRewardsDistributorArtifact.abi, this.provider)
  }

  async registerPool(contract: string): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).registerPool(contract)
    } catch (error) {
      console.error('Error in registerPool:', error)
      throw error
    }
  }

  async unregisterPool(contract: string): Promise<void> {
    try {
      return await this.contract.connect(this.signer).unregisterPool(contract)
    } catch (error) {
      console.error('Error in unregisterPool:', error)
      throw error
    }
  }

  async distribute(): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).distribute()
    } catch (error) {
      console.error('Error in distribute:', error)
      throw error
    }
  }

  async weightTotal(): Promise<BigNumber> {
    try {
      return await this.contract.weightTotal()
    } catch (error) {
      console.error('Error in weightTotal:', error)
      throw error
    }
  }

  async token(): Promise<string> {
    try {
      return await this.contract.token()
    } catch (error) {
      console.error('Error in token:', error)
      throw error
    }
  }

  async pools(): Promise<string[]> {
    try {
      return await this.contract.pools()
    } catch (error) {
      console.error('Error in token:', error)
      throw error
    }
  }

  async Konstant(): Promise<BigNumber> {
    try {
      return await this.contract.Konstant()
    } catch (error) {
      console.error('Error in Konstant:', error)
      throw error
    }
  }

  async lockingPortion(): Promise<BigNumber> {
    try {
      return await this.contract.lockingPortion()
    } catch (error) {
      console.error('Error in lockingPortion:', error)
      throw error
    }
  }

  async stakingPortion(): Promise<BigNumber> {
    try {
      return await this.contract.stakingPortion()
    } catch (error) {
      console.error('Error in stakingPortion:', error)
      throw error
    }
  }
}
