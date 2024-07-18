import { Contract, ethers, Signer } from 'ethers'
import LendingPoolLens from './artifacts/LendingPoolLens.json'
import { IAccountInfo, IAggregateStats, IMarketInfo, IPoolCollateralInfo, IPoolStats } from './utils/types'

export class PoolLens {
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

  async getAggregateStats(onlyActive: boolean): Promise<IAggregateStats> {
    try {
      return await this.contract.getAggregateStats(onlyActive)
    } catch (error) {
      this.handleContractError(error, 'getting aggregate stats')
      throw error
    }
  }

  async getMarketInfo(poolAddress: string): Promise<IMarketInfo> {
    try {
      return await this.contract.getMarketInfo(poolAddress)
    } catch (error) {
      this.handleContractError(error, 'getting market information')
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
      return await this.contract.registeredPools()
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
      throw error
    }
  }

  private handleContractError(error: any, message: string) {
    console.error(`Error in ${message}:`, error)
  }
}
