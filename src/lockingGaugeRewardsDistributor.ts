import { Contract, ethers, Signer } from 'ethers'
import LockingGaugeRewardsDistributorArtifact from './artifacts/LockingGaugeRewardsDistributor.json'

export class LockingGaugeRewardsDistributor {
  public contract!: Contract

  constructor(
    private provider: ethers.JsonRpcProvider,
    private address: string,
    public signer: Signer,
  ) {
    this.initializeContract()
  }

  private initializeContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, LockingGaugeRewardsDistributorArtifact.abi, this.provider)
  }

  async registerPool(contract: string): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('registerPool')(contract)
    } catch (error) {
      console.error('Error in registerPool:', error)
      throw error
    }
  }

  async unregisterPool(contract: string): Promise<void> {
    try {
      return await this.contract.connect(this.signer).getFunction('unregisterPool')(contract)
    } catch (error) {
      console.error('Error in unregisterPool:', error)
      throw error
    }
  }

  async distribute(): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('distribute')()
    } catch (error) {
      console.error('Error in distribute:', error)
      throw error
    }
  }

  async totalWeightSum(): Promise<bigint> {
    try {
      return await this.contract.totalWeightSum()
    } catch (error) {
      console.error('Error in totalWeightSum:', error)
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

  async Konstant(): Promise<bigint> {
    try {
      return await this.contract.Konstant()
    } catch (error) {
      console.error('Error in Konstant:', error)
      throw error
    }
  }

  async lockingPortion(): Promise<bigint> {
    try {
      return await this.contract.lockingPortion()
    } catch (error) {
      console.error('Error in lockingPortion:', error)
      throw error
    }
  }

  async stakingPortion(): Promise<bigint> {
    try {
      return await this.contract.stakingPortion()
    } catch (error) {
      console.error('Error in stakingPortion:', error)
      throw error
    }
  }
}
