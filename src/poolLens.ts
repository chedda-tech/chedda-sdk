import { Contract, ethers, Signer } from 'ethers'
import LendingPoolLens from './artifacts/LendingPoolLens.json'

/** Type for the contract interface */

export class PoolLens {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.WebSocketProvider,
    private address: string,
    public signer: Signer,
  ) {
    this.initiateContract()
  }

  /**
   * Initializes the contract instance.
   */
  private initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, LendingPoolLens.abi, this.provider)
  }

  async activePools() {
    try {
      return await this.contract.activePools()
    } catch (error) {
      this.handleContractError(error, 'getting active pools')
    }
  }

  async getAggregateStats() {
    try {
      return await this.contract.getAggregateStats()
    } catch (error) {
      this.handleContractError(error, 'getting aggregate stats')
    }
  }

  async getPoolAccountInfo(poolAddress: string, account: string) {
    try {
      return await this.contract.getPoolAccountInfo(poolAddress, account)
    } catch (error) {
      this.handleContractError(error, 'getting pool account information')
    }
  }

  async getPoolCollateral(poolAddress: string) {
    try {
      return await this.contract.getPoolCollateral(poolAddress)
    } catch (error) {
      this.handleContractError(error, 'getting pool collateral')
    }
  }

  async getPoolStats(poolAddress: string) {
    try {
      return await this.contract.getPoolStats(poolAddress)
    } catch (error) {
      this.handleContractError(error, 'getting pool stats')
    }
  }

  async getPoolStatsList(pools: string[]) {
    try {
      return await this.contract.getPoolStatsList(pools)
    } catch (error) {
      this.handleContractError(error, 'getting pool stats')
    }
  }

  async owner() {
    try {
      return await this.contract.owner()
    } catch (error) {
      this.handleContractError(error, 'getting owner')
    }
  }

  async registeredPools() {
    try {
      return await this.contract.connect(this.signer).registeredPools()
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
    }
  }

  async registerPool(pool: string, isActive: boolean) {
    try {
      return await this.contract.connect(this.signer).registerPool(pool, isActive)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
    }
  }

  async renounceOwnership() {
    try {
      return await this.contract.connect(this.signer).renounceOwnership()
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
    }
  }

  async setActive(pool: string, isActive: boolean) {
    try {
      return await this.contract.connect(this.signer).setActive(pool, isActive)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
    }
  }

  async transferOwnership(newOwner: string) {
    try {
      return await this.contract.connect(this.signer).transferOwnership(newOwner)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
    }
  }

  async unregisterPool(pool: string) {
    try {
      return await this.contract.connect(this.signer).unregisterPool(pool)
    } catch (error) {
      this.handleContractError(error, 'getting registered pool')
    }
  }

  /**
   * Generic error handling method.
   * @param error The error to handle.
   * @param message The error message to log.
   */
  private handleContractError(error: any, message: string) {
    console.error(`Error in ${message}:`, error)
    throw error
  }
}
