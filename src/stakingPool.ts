import { BigNumber, Contract, ethers, Signer } from 'ethers'
import StakingPoolArtifact from './artifacts/StakingPool.json'

export class StakingPool {
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

    this.contract = new ethers.Contract(this.address, StakingPoolArtifact.abi, this.provider)
  }

  async stake(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).stake(amount)
    } catch (error) {
      console.error('Error in stake:', error)
      throw error
    }
  }

  async unStake(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).unstake(amount)
    } catch (error) {
      console.error('Error in unStake:', error)
      throw error
    }
  }

  async claim(): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).claim()
    } catch (error) {
      console.error('Error in claim:', error)
      throw error
    }
  }

  async claimable(account: string): Promise<BigNumber> {
    try {
      return await this.contract.claimable(account)
    } catch (error) {
      this.handleContractError(error, 'getting claimable')
      throw error
    }
  }

  async stakingBalance(account: string): Promise<BigNumber> {
    try {
      return await this.contract.stakingBalance(account)
    } catch (error) {
      this.handleContractError(error, 'getting staking balance')
      throw error
    }
  }

  async addRewards(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).addRewards(amount)
    } catch (error) {
      console.error('Error in addrewards:', error)
      throw error
    }
  }

  async userInfo(address: string) {
    try {
      return await this.contract.userInfo(address)
    } catch (error) {
      console.error('Error in userInfo:', error)
      throw error
    }
  }

  async totalStaked() {
    try {
      return await this.contract.totalStaked()
    } catch (error) {
      console.error('Error in userInfo:', error)
      throw error
    }
  }

  async rewardToken() {
    try {
      return await this.contract.rewardToken()
    } catch (error) {
      console.error('Error in userInfo:', error)
      throw error
    }
  }

  async stakers() {
    try {
      return await this.contract.stakers()
    } catch (error) {
      console.error('Error in userInfo:', error)
      throw error
    }
  }

  async stakingToken() {
    try {
      return await this.contract.stakingToken()
    } catch (error) {
      console.error('Error in userInfo:', error)
      throw error
    }
  }
  private handleContractError(error: any, message: string) {
    console.error(`Error in ${message}:`, error)
  }
}
