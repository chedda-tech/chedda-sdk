import { BigNumber, Contract, ethers, Signer } from 'ethers'
import CheddaBaseTokenVault from './artifacts/CheddaBaseTokenVault.json'

export class CheddaVault {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.WebSocketProvider,
    private address: string,
    public signer: Signer,
  ) {
    this.initiateContract()
  }

  async depositAsset(amount: BigNumber, toAccount: string) {
    try {
      return await this.contract.connect(this.signer).deposit(amount, toAccount)
    } catch (error) {
      console.error('Error in depositAsset:', error)
      throw error
    }
  }

  async redeem(amount: BigNumber, toAccount: string) {
    try {
      return await this.contract.connect(this.signer).redeem(amount, toAccount, toAccount)
    } catch (error) {
      console.error('Error in redeem:', error)
      throw error
    }
  }

  async addCollateral(token: string, amount: BigNumber) {
    try {
      return await this.contract.connect(this.signer).addCollateral(token, amount)
    } catch (error) {
      console.error('Error in addCollateral:', error)
      throw error
    }
  }

  async removeCollateral(token: string, amount: BigNumber) {
    try {
      return await this.contract.connect(this.signer).removeCollateral(token, amount)
    } catch (error) {
      console.error('Error in removeCollateral:', error)
      throw error
    }
  }

  async accountCollateralTokenIds(account: string, token: string) {
    try {
      return await this.contract.accountCollateralTokenIds(account, token)
    } catch (error) {
      console.error('Error in accountCollateralTokenIds:', error)
      throw error
    }
  }

  async borrow(amount: BigNumber) {
    try {
      return await this.contract.connect(this.signer).take(amount)
    } catch (error) {
      console.error('Error in borrow:', error)
      throw error
    }
  }

  async repay(amount: BigNumber) {
    try {
      return await this.contract.connect(this.signer).putAmount(amount)
    } catch (error) {
      console.error('Error in repay:', error)
      throw error
    }
  }

  async collateral(account: string, token: string): Promise<any> {
    try {
      return await this.contract.accountCollateral(account, token)
    } catch (error) {
      console.error('Error in collateral:', error)
      throw error
    }
  }

  async totalAssets(): Promise<BigNumber> {
    try {
      return await this.contract.totalAssets()
    } catch (error) {
      console.error('Error in totalAssets:', error)
      throw error
    }
  }

  async collateralAmounts() {
    try {
      return await this.contract.collateralAmounts()
    } catch (error) {
      console.error('Error in collateralAmounts:', error)
      throw error
    }
  }

  async utilization(): Promise<BigNumber> {
    try {
      return await this.contract.utilization()
    } catch (error) {
      console.error('Error in utilization:', error)
      throw error
    }
  }

  async totalAccountCollateralValue(account: string): Promise<BigNumber> {
    try {
      return await this.contract.totalAccountCollateralValue(account)
    } catch (error) {
      console.error('Error in totalAccountCollateralValue:', error)
      throw error
    }
  }

  async depositApr(): Promise<BigNumber> {
    try {
      return await this.contract.depositApr()
    } catch (error) {
      console.error('Error in depositApr:', error)
      throw error
    }
  }

  async borrowApr(): Promise<BigNumber> {
    try {
      return await this.contract.borrowApr()
    } catch (error) {
      console.error('Error in borrowApr:', error)
      throw error
    }
  }

  async rewardsApr(): Promise<BigNumber> {
    try {
      return await this.contract.rewardsApr()
    } catch (error) {
      console.error('Error in rewardsApr:', error)
      throw error
    }
  }

  async getVaultStats() {
    try {
      return await this.contract.getVaultStats()
    } catch (error) {
      console.error('Error in getVaultStats:', error)
      throw error
    }
  }

  // ERC20
  async approve(spender: string, amount: BigNumber) {
    try {
      await this.contract.connect(this.signer).approve(spender, amount)
    } catch (error) {
      console.error('Error in approve:', error)
      throw error
    }
  }

  async allowance(account: string, spender: string): Promise<BigNumber> {
    try {
      return await this.contract.allowance(account, spender)
    } catch (error) {
      console.error('Error in allowance:', error)
      throw error
    }
  }

  async balanceOf(account: string): Promise<BigNumber> {
    try {
      return await this.contract.balanceOf(account)
    } catch (error) {
      console.error('Error in balanceOf:', error)
      throw error
    }
  }

  async transfer(to: string, amount: BigNumber) {
    try {
      await this.contract.connect(this.signer).transfer(to, amount)
    } catch (error) {
      console.error('Error in transfer:', error)
      throw error
    }
  }

  async totalSupply(): Promise<BigNumber> {
    try {
      return await this.contract.totalSupply()
    } catch (error) {
      console.error('Error in totalSupply:', error)
      throw error
    }
  }

  async gauge(): Promise<string> {
    try {
      return await this.contract.gauge()
    } catch (error) {
      console.error('Error in gauge:', error)
      throw error
    }
  }

  async accountPendingAmount(account: string): Promise<BigNumber> {
    try {
      return await this.contract.accountPendingAmount(account)
    } catch (error) {
      console.error('Error in accountPendingAmount:', error)
      throw error
    }
  }

  initiateContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, CheddaBaseTokenVault.abi, this.provider)
  }
}
