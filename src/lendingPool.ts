import { BigNumber, Contract, ethers, Signer } from 'ethers'
import LendingPoolArtifact from './artifacts/LendingPool.json'
import { ICollateralDeposited, IInterestRates } from './utils/types'

export class LendingPool {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.WebSocketProvider,
    private address: string,
    private signer: Signer,
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

    this.contract = new ethers.Contract(this.address, LendingPoolArtifact.abi, this.provider)
  }

  async addCollateral(token: string, amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).addCollateral(token, amount)
    } catch (error) {
      console.error('Error in addCollateral:', error)
      throw error
    }
  }

  // ERC20
  async approve(spender: string, amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).approve(spender, amount)
    } catch (error) {
      console.error('Error in approve:', error)
      throw error
    }
  }

  async depositAsset(assets: BigNumber, receiver: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).deposit(assets, receiver)
    } catch (error) {
      console.error('Error in depositAsset:', error)
      throw error
    }
  }

  async mintAsset(shares: BigNumber, receiver: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).mint(shares, receiver)
    } catch (error) {
      console.error('Error in mintAsset:', error)
      throw error
    }
  }

  //Todo: Permit
  //Need explanation

  async putAmount(amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).putAmount(amount)
    } catch (error) {
      console.error('Error in putAmount:', error)
      throw error
    }
  }

  async putShares(shares: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).putShares(shares)
    } catch (error) {
      console.error('Error in putAmount:', error)
      throw error
    }
  }

  async redeem(shares: BigNumber, receiver: string, owner: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).redeem(shares, receiver, owner)
    } catch (error) {
      console.error('Error in redeem:', error)
      throw error
    }
  }

  async removeCollateral(token: string, amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).removeCollateral(token, amount)
    } catch (error) {
      console.error('Error in removeCollateral:', error)
      throw error
    }
  }

  async renounceOwnerShip(): Promise<void> {
    try {
      await this.contract.connect(this.signer).renounceOwnerShip()
    } catch (error) {
      console.error('Error in renounceOwnerShip:', error)
      throw error
    }
  }

  async setGauge(_gauge: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).setGauge(_gauge)
    } catch (error) {
      console.error('Error in setGauge:', error)
      throw error
    }
  }

  async supply(amount: BigNumber, receiver: string, useAsCollateral: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).supply(amount, receiver, useAsCollateral)
    } catch (error) {
      console.error('Error in supply:', error)
      throw error
    }
  }

  async take(amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).take(amount)
    } catch (error) {
      console.error('Error in take:', error)
      throw error
    }
  }

  async transfer(to: string, amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).transfer(to, amount)
    } catch (error) {
      console.error('Error in transfer:', error)
      throw error
    }
  }

  async transferFrom(from: string, to: string, amount: BigNumber): Promise<void> {
    try {
      await this.contract.connect(this.signer).transferFrom(from, to, amount)
    } catch (error) {
      console.error('Error in transferFrom:', error)
      throw error
    }
  }

  async transferOwnership(newOwner: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).transferOwnership(newOwner)
    } catch (error) {
      console.error('Error in transferOwnership:', error)
      throw error
    }
  }

  async withdraw(assetAmount: BigNumber, receiver: string, owner: string): Promise<void> {
    try {
      await this.contract.connect(this.signer).withdraw(assetAmount, receiver, owner)
    } catch (error) {
      console.error('Error in withdraw:', error)
      throw error
    }
  }

  //Read contract ---------------------------------------------

  async accountAssetsBorrowed(account: string): Promise<BigNumber> {
    try {
      return await this.contract.accountAssetsBorrowed(account)
    } catch (error) {
      console.error('Error in accountAssetsBorrowed:', error)
      throw error
    }
  }

  async accountCollateralAmount(account: string, collateral: string): Promise<BigNumber> {
    try {
      return await this.contract.accountCollateralAmount(account, collateral)
    } catch (error) {
      console.error('Error in accountCollateralAmount:', error)
      throw error
    }
  }

  async accountCollateralDeposited(account: string, collateral: string): Promise<ICollateralDeposited> {
    try {
      return await this.contract.accountCollateralDeposited(account, collateral)
    } catch (error) {
      console.error('Error in accountCollateralDeposited:', error)
      throw error
    }
  }

  async accountCollateralTokenIds(account: string, collateral: string): Promise<{ tokenIds: BigNumber[] }> {
    try {
      return await this.contract.accountCollateralTokenIds(account, collateral)
    } catch (error) {
      console.error('Error in accountCollateralTokenIds:', error)
      throw error
    }
  }

  async accountHealth(account: string): Promise<BigNumber> {
    try {
      return await this.contract.accountHealth(account)
    } catch (error) {
      console.error('Error in accountHealth:', error)
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

  async asset(): Promise<string> {
    try {
      return await this.contract.asset()
    } catch (error) {
      console.error('Error in asset:', error)
      throw error
    }
  }

  async assetBalance(account: string): Promise<BigNumber> {
    try {
      return await this.contract.assetBalance(account)
    } catch (error) {
      console.error('Error in assetBalance:', error)
      throw error
    }
  }

  async available(): Promise<BigNumber> {
    try {
      return await this.contract.assetBalance()
    } catch (error) {
      console.error('Error in assetBalance:', error)
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

  async baseBorrowAPY(): Promise<BigNumber> {
    try {
      return await this.contract.baseBorrowAPY()
    } catch (error) {
      console.error('Error in balanceOf:', error)
      throw error
    }
  }

  async baseSupplyAPY(): Promise<BigNumber> {
    try {
      return await this.contract.baseSupplyAPY()
    } catch (error) {
      console.error('Error in baseSuppyAPY:', error)
      throw error
    }
  }

  async borrowed(): Promise<BigNumber> {
    try {
      return await this.contract.borrowed()
    } catch (error) {
      console.error('Error in borrowed:', error)
      throw error
    }
  }

  async characterization(): Promise<string> {
    try {
      return await this.contract.characterization()
    } catch (error) {
      console.error('Error in chaterization:', error)
      throw error
    }
  }

  async collateralAllowed(collateral: string): Promise<boolean> {
    try {
      return await this.contract.collateralAllowed(collateral)
    } catch (error) {
      console.error('Error in collateralAllowed:', error)
      throw error
    }
  }

  async collateralFactor(collateral: string): Promise<BigNumber> {
    try {
      return await this.contract.collateralFactor(collateral)
    } catch (error) {
      console.error('Error in collateralFactor:', error)
      throw error
    }
  }

  async collateralTokenList(collateral: string): Promise<string> {
    try {
      return await this.contract.collateralTokenList(collateral)
    } catch (error) {
      console.error('Error in collateralTokenList:', error)
      throw error
    }
  }

  async collateralTokenTypes(collateral: string): Promise<number> {
    try {
      return await this.contract.collateralTokenTypes(collateral)
    } catch (error) {
      console.error('Error in collateralTokenList:', error)
      throw error
    }
  }

  async collaterals(collateral: string): Promise<string[]> {
    try {
      return await this.contract.collaterals(collateral)
    } catch (error) {
      console.error('Error in collaterals:', error)
      throw error
    }
  }

  async convertToAssets(shares: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.convertToAssets(shares)
    } catch (error) {
      console.error('Error in convertToAssets:', error)
      throw error
    }
  }

  async convertToShares(assets: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.convertToShares(assets)
    } catch (error) {
      console.error('Error in convertToShares:', error)
      throw error
    }
  }

  async debtToken(): Promise<string> {
    try {
      return await this.contract.debtToken()
    } catch (error) {
      console.error('Error in debtToken:', error)
      throw error
    }
  }

  async debtValue(): Promise<BigNumber> {
    try {
      return await this.contract.debtValue()
    } catch (error) {
      console.error('Error in debtValue:', error)
      throw error
    }
  }

  async decimals(): Promise<number> {
    try {
      return await this.contract.decimals()
    } catch (error) {
      console.error('Error in decimals:', error)
      throw error
    }
  }

  async feesPaid(): Promise<BigNumber> {
    try {
      return await this.contract.feesPaid()
    } catch (error) {
      console.error('Error in feesPaid:', error)
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

  async getTokenCollateralValue(token: string, amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.getTokenCollateralValue(token, amount)
    } catch (error) {
      console.error('Error in getTokenCollateralValue:', error)
      throw error
    }
  }

  async getTokenMarketValue(token: string, amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.getTokenMarketValue(token, amount)
    } catch (error) {
      console.error('Error in getTokenMarketValue:', error)
      throw error
    }
  }

  async interestRateModel(): Promise<string> {
    try {
      return await this.contract.interestRates()
    } catch (error) {
      console.error('Error in interestRates:', error)
      throw error
    }
  }

  async interestRates(): Promise<IInterestRates> {
    try {
      return await this.contract.interestRates()
    } catch (error) {
      console.error('Error in interestRates:', error)
      throw error
    }
  }

  async maxDeposit(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.maxDeposit(amount)
    } catch (error) {
      console.error('Error in maxDeposit:', error)
      throw error
    }
  }

  async maxMint(amount: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.maxMint(amount)
    } catch (error) {
      console.error('Error in maxMint:', error)
      throw error
    }
  }

  async maxRedeem(owner: string): Promise<BigNumber> {
    try {
      return await this.contract.maxRedeem(owner)
    } catch (error) {
      console.error('Error in maxRedeem:', error)
      throw error
    }
  }

  async maxWithdraw(owner: string): Promise<BigNumber> {
    try {
      return await this.contract.maxWithdraw(owner)
    } catch (error) {
      console.error('Error in maxWithdraw:', error)
      throw error
    }
  }

  async name(): Promise<string> {
    try {
      return await this.contract.name()
    } catch (error) {
      console.error('Error in name:', error)
      throw error
    }
  }

  async owner(): Promise<BigNumber> {
    try {
      return await this.contract.owner()
    } catch (error) {
      console.error('Error in nonces:', error)
      throw error
    }
  }

  async nonces(address: string): Promise<BigNumber> {
    try {
      return await this.contract.nonces(address)
    } catch (error) {
      console.error('Error in nonces:', error)
      throw error
    }
  }

  async poolAsset(): Promise<string> {
    try {
      return await this.contract.poolAsset()
    } catch (error) {
      console.error('Error in poolAsset:', error)
      throw error
    }
  }

  async previewDeposit(assets: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.previewDeposit(assets)
    } catch (error) {
      console.error('Error in previewDeposit:', error)
      throw error
    }
  }

  async previewMint(shares: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.previewMint(shares)
    } catch (error) {
      console.error('Error in previewMint:', error)
      throw error
    }
  }

  async previewRedeem(shares: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.previewRedeem(shares)
    } catch (error) {
      console.error('Error in previewMint:', error)
      throw error
    }
  }

  async previewWithdraw(assets: BigNumber): Promise<BigNumber> {
    try {
      return await this.contract.previewWithdraw(assets)
    } catch (error) {
      console.error('Error in previewWithdraw:', error)
      throw error
    }
  }

  async priceFeed(): Promise<string> {
    try {
      return await this.contract.priceFeed()
    } catch (error) {
      console.error('Error in priceFeed:', error)
      throw error
    }
  }

  async supplied(): Promise<BigNumber> {
    try {
      return await this.contract.supplied()
    } catch (error) {
      console.error('Error in supplied:', error)
      throw error
    }
  }

  async symbol(): Promise<string> {
    try {
      return await this.contract.symbol()
    } catch (error) {
      console.error('Error in symbol:', error)
      throw error
    }
  }

  async tokenCollateralDeposited(collateral: string): Promise<BigNumber> {
    try {
      return await this.contract.tokenCollateralDeposited(collateral)
    } catch (error) {
      console.error('Error in tokenCollateralDeposited:', error)
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

  async totalAssets(): Promise<BigNumber> {
    try {
      return await this.contract.totalAssets()
    } catch (error) {
      console.error('Error in totalAssets:', error)
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

  async tvl(): Promise<BigNumber> {
    try {
      return await this.contract.tvl()
    } catch (error) {
      console.error('Error in tvl:', error)
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
}
