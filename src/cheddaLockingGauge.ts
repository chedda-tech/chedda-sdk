import { Contract, ethers, JsonRpcSigner } from 'ethers'
import CheddaLockingGaugeArtifact from './artifacts/CheddaLockingGauge.json'
import { Lock, LockTime } from './utils/types'

export class CheddaLockingGauge {
  public contract!: Contract

  constructor(
    private provider: ethers.JsonRpcProvider,
    private address: string,
    public signer: JsonRpcSigner,
  ) {
    this.initializeContract()
  }

  private initializeContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, CheddaLockingGaugeArtifact.abi, this.provider)
  }

  async extendLock(time: LockTime): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('extendLock')(time)
    } catch (error) {
      console.error('Error in extendLock:', error)
      throw error
    }
  }

  async addToLock(amount: bigint): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('addToLock')(amount)
    } catch (error) {
      console.error('Error in addToLock:', error)
      throw error
    }
  }

  async createLock(amount: bigint, time: LockTime): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('createLock')(amount, time)
    } catch (error) {
      console.error('Error in createLock:', error)
      throw error
    }
  }

  async withdraw(): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('withdraw')()
    } catch (error) {
      console.error('Error in withdraw:', error)
      throw error
    }
  }

  async claim(): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('claim')()
    } catch (error) {
      console.error('Error in claim:', error)
      throw error
    }
  }

  async claimable(account: string): Promise<bigint> {
    try {
      return await this.contract.claimable(account)
    } catch (error) {
      this.handleContractError(error, 'getting claimable')
      throw error
    }
  }

  async addRewards(amount: bigint): Promise<bigint> {
    try {
      return await this.contract.connect(this.signer).getFunction('addRewards')(amount)
    } catch (error) {
      console.error('Error in addRewards:', error)
      throw error
    }
  }

  async getLock(address: string): Promise<Lock> {
    try {
      return await this.contract.getLock(address)
    } catch (error) {
      console.error('Error in getLock:', error)
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

  async rewardPerShare(): Promise<bigint> {
    try {
      return await this.contract.rewardPerShare()
    } catch (error) {
      console.error('Error in rewardPerShare:', error)
      throw error
    }
  }

  async totalWeight(): Promise<bigint> {
    try {
      return await this.contract.totalWeight()
    } catch (error) {
      console.error('Error in totalWeight:', error)
      throw error
    }
  }

  async totalLocked(): Promise<bigint> {
    try {
      return await this.contract.totalLocked()
    } catch (error) {
      console.error('Error in totalLocked:', error)
      throw error
    }
  }

  async totalClaimed(): Promise<bigint> {
    try {
      return await this.contract.totalClaimed()
    } catch (error) {
      console.error('Error in totalClaimed:', error)
      throw error
    }
  }

  async totalRewards(): Promise<bigint> {
    try {
      return await this.contract.totalRewards()
    } catch (error) {
      console.error('Error in totalRewards:', error)
      throw error
    }
  }

  async weight(): Promise<bigint> {
    try {
      return await this.contract.weight()
    } catch (error) {
      console.error('Error in weight:', error)
      throw error
    }
  }

  async numberOfLocks(): Promise<bigint> {
    try {
      return await this.contract.numberOfLocks()
    } catch (error) {
      console.error('Error in numberOfLocks:', error)
      throw error
    }
  }

  private handleContractError(error: any, message: string) {
    console.error(`Error in ${message}:`, error)
  }
}
