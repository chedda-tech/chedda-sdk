import { BigNumber, Contract, ethers, Signer } from 'ethers'
import CheddaLockingGaugeArtifact from './artifacts/CheddaLockingGauge.json'
import { Lock, LockTime } from './utils/types'

export class CheddaLockingGauge {
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

    this.contract = new ethers.Contract(this.address, CheddaLockingGaugeArtifact.abi, this.provider)
  }

  async extendLock(time: LockTime): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).extendLock(time)
    } catch (error) {
      console.error('Error in extendLock:', error)
      throw error
    }
  }

  async addToLock(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).addToLock(amount)
    } catch (error) {
      console.error('Error in addToLock:', error)
      throw error
    }
  }

  async createLock(amount: BigNumber, time: LockTime): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).createLock(amount, time)
    } catch (error) {
      console.error('Error in createLock:', error)
      throw error
    }
  }

  async withdraw(): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).withdraw()
    } catch (error) {
      console.error('Error in withdraw:', error)
      throw error
    }
  }

  async getLock(address: string): Promise<Lock> {
    try {
      return await this.contract.connect(this.signer).getLock(address)
    } catch (error) {
      console.error('Error in getLock:', error)
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

  async addRewards(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).addRewards(amount)
    } catch (error) {
      console.error('Error in addRewards:', error)
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

  async rewardPerShare(): Promise<BigNumber> {
    try {
      return await this.contract.rewardPerShare()
    } catch (error) {
      console.error('Error in rewardPerShare:', error)
      throw error
    }
  }

  async totalLocked(): Promise<BigNumber> {
    try {
      return await this.contract.totalLocked()
    } catch (error) {
      console.error('Error in totalLocked:', error)
      throw error
    }
  }

  async totalClaimed(): Promise<BigNumber> {
    try {
      return await this.contract.totalClaimed()
    } catch (error) {
      console.error('Error in totalClaimed:', error)
      throw error
    }
  }

  async totalRewards(): Promise<BigNumber> {
    try {
      return await this.contract.totalRewards()
    } catch (error) {
      console.error('Error in totalRewards:', error)
      throw error
    }
  }

  async weight(): Promise<BigNumber> {
    try {
      return await this.contract.weight()
    } catch (error) {
      console.error('Error in weight:', error)
      throw error
    }
  }

  async numberOfLocks(): Promise<BigNumber> {
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
