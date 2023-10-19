import { Contract, ethers, Signer } from 'ethers'
import LendingPoolLens from './artifacts/LendingPoolLens.json'
import { IAccountInfo, IAggregateStats, IPoolCollateralInfo, IPoolStats } from './utils/types'

export class PoolLens {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.WebSocketProvider,
    private address: string,
    public signer: Signer,
  ) {
    this.initiateContract()
  }

  private initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, LendingPoolLens.abi, this.provider)
  }

  async activePools(): Promise<string[]> {
    try {
      return await this.contract.activePools()
    } catch (error) {
      this.handleContractError(error, 'getting active pools')
      throw error
    }
  }

  async getAggregateStats(): Promise<IAggregateStats> {
    try {
      return await this.contract.getAggregateStats()
    } catch (error) {
      this.handleContractError(error, 'getting aggregate stats')
      throw error
    }
  }

  async getPoolAccountInfo(poolAddress: string, account: string): Promise<IAccountInfo> {
    try {
      return await this.contract.getPoolAccountInfo(poolAddress, account)
    } catch (error) {
      this.handleContractError(error, 'getting pool account information')
      throw error
    }
  }

  async getPoolCollateral(poolAddress: string): Promise<IPoolCollateralInfo[]> {
    try {
      return await this.contract.getPoolCollateral(poolAddress)
    } catch (error) {
      this.handleContractError(error, 'getting pool collateral')
      throw error
    }
  }

  async getPoolStats(poolAddress: string): Promise<IPoolStats> {
    try {
      return await this.contract.getPoolStats(poolAddress)
    } catch (error) {
      this.handleContractError(error, 'getting pool stats')
      throw error
    }
  }

  async getPoolStatsList(pools: string[]): Promise<IPoolStats[]> {
    try {
      return await this.contract.getPoolStatsList(pools)
    } catch (error) {
      this.handleContractError(error, 'getting pool stats')
      throw error
    }
  }

  async owner(): Promise<string> {
    try {
      return await this.contract.owner()
    } catch (error) {
      this.handleContractError(error, 'getting owner')
      throw error
    }
  }

  async registeredPools(): Promise<string[]> {
    try {
      return await this.contract.connect(this.signer).registeredPools()
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  async registerPool(pool: string, isActive: boolean): Promise<void> {
    try {
      await this.contract.connect(this.signer).registerPool(pool, isActive)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  async renounceOwnership(): Promise<void> {
    try {
      await this.contract.connect(this.signer).renounceOwnership()
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  async setActive(pool: string, isActive: boolean): Promise<void> {
    try {
      await this.contract.connect(this.signer).setActive(pool, isActive)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  async transferOwnership(newOwner: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).transferOwnership(newOwner)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  async unregisterPool(pool: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).unregisterPool(pool)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  private handleContractError(error: any, message: string) {
    console.error(`Error in ${message}:`, error)
  }
}
