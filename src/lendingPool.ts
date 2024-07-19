import { Contract, ContractTransactionResponse, ethers, Signer } from 'ethers'
import { ICollateralDeposited, IInterestRates } from './utils/types'
import LendingPoolArtifact from './artifacts/LendingPool.json'

export class LendingPool {
  public contract!: Contract
  private signerContract!: any

  constructor(
    private provider: ethers.JsonRpcProvider,
    private address: string,
    private signer: Signer,
  ) {
    this.initializeContract()
  }

  /**
   * Initializes the contract instance.
   */
  private initializeContract() {
    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, LendingPoolArtifact.abi, this.provider)
    this.signerContract = this.contract.connect(this.signer)
  }

  async addCollateral(token: string, amount: bigint): Promise<ContractTransactionResponse> {
    try {
      return await this.signerContract.addCollateral.staticCall(token, amount)
    } catch (error) {
      console.error('Error in addCollateral:', error)
      throw error
    }
  }

  // ERC20
  async approve(spender: string, amount: bigint): Promise<ContractTransactionResponse> {
    try {
      return await this.signerContract.approve.staticCall(spender, amount)
    } catch (error) {
      console.error('Error in approve:', error)
      throw error
    }
  }

  async depositAsset(assets: bigint, receiver: string): Promise<bigint> {
    try {
      return await this.signerContract.deposit.staticCall(assets, receiver)
    } catch (error) {
      console.error('Error in depositAsset:', error)
      throw error
    }
  }

  async mintAsset(shares: bigint, receiver: string): Promise<void> {
    try {
      return await this.signerContract.mint.staticCall(shares, receiver)
    } catch (error) {
      console.error('Error in mintAsset:', error)
      throw error
    }
  }

  //Todo: Permit
  //Need explanation

  async putAmount(amount: bigint): Promise<bigint> {
    try {
      return await this.signerContract.putAmount.staticCall(amount)
    } catch (error) {
      console.error('Error in putAmount:', error)
      throw error
    }
  }

  async putShares(shares: bigint): Promise<bigint> {
    try {
      return await this.signerContract.putShares.staticCall(shares)
    } catch (error) {
      console.error('Error in putAmount:', error)
      throw error
    }
  }

  async redeem(shares: bigint, receiver: string, owner: string): Promise<bigint> {
    try {
      return await this.signerContract.redeem.staticCall(shares, receiver, owner)
    } catch (error) {
      console.error('Error in redeem:', error)
      throw error
    }
  }

  async removeCollateral(token: string, amount: bigint): Promise<void> {
    try {
      return await this.signerContract.removeCollateral.staticCall(token, amount)
    } catch (error) {
      console.error('Error in removeCollateral:', error)
      throw error
    }
  }

  async renounceOwnerShip(): Promise<void> {
    try {
      return await this.signerContract.renounceOwnerShip.staticCall()
    } catch (error) {
      console.error('Error in renounceOwnerShip:', error)
      throw error
    }
  }

  async setGauge(_gauge: string): Promise<void> {
    try {
      return await this.signerContract.setGauge.staticCall(_gauge)
    } catch (error) {
      console.error('Error in setGauge:', error)
      throw error
    }
  }

  async supply(amount: bigint, receiver: string, useAsCollateral: boolean): Promise<bigint> {
    try {
      return await this.signerContract.supply.staticCall(amount, receiver, useAsCollateral)
    } catch (error) {
      console.error('Error in supply:', error)
      throw error
    }
  }

  async take(amount: bigint): Promise<bigint> {
    try {
      return await this.signerContract.take.staticCall(amount)
    } catch (error) {
      console.error('Error in take:', error)
      throw error
    }
  }

  async transfer(to: string, amount: bigint): Promise<boolean> {
    try {
      return await this.signerContract.transfer.staticCall(to, amount)
    } catch (error) {
      console.error('Error in transfer:', error)
      throw error
    }
  }

  async transferFrom(from: string, to: string, amount: bigint): Promise<boolean> {
    try {
      return await this.signerContract.transferFrom.staticCall(from, to, amount)
    } catch (error) {
      console.error('Error in transferFrom:', error)
      throw error
    }
  }

  async transferOwnership(newOwner: string): Promise<void> {
    try {
      return await this.signerContract.transferOwnership.staticCall(newOwner)
    } catch (error) {
      console.error('Error in transferOwnership:', error)
      throw error
    }
  }

  async withdraw(assetAmount: bigint, receiver: string, owner: string): Promise<bigint> {
    try {
      return await this.signerContract.withdraw.staticCall(assetAmount, receiver, owner)
    } catch (error) {
      console.error('Error in withdraw:', error)
      throw error
    }
  }

  //Read contract ---------------------------------------------

  async accountAssetsBorrowed(account: string): Promise<bigint> {
    try {
      return await this.contract.accountAssetsBorrowed(account)
    } catch (error) {
      console.error('Error in accountAssetsBorrowed:', error)
      throw error
    }
  }

  async accountCollateralAmount(account: string, collateral: string): Promise<bigint> {
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

  async accountCollateralTokenIds(account: string, collateral: string): Promise<{ tokenIds: bigint[] }> {
    try {
      return await this.contract.accountCollateralTokenIds(account, collateral)
    } catch (error) {
      console.error('Error in accountCollateralTokenIds:', error)
      throw error
    }
  }

  async accountHealth(account: string): Promise<bigint> {
    try {
      return await this.contract.accountHealth(account)
    } catch (error) {
      console.error('Error in accountHealth:', error)
      throw error
    }
  }

  async allowance(account: string, spender: string): Promise<bigint> {
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

  async assetBalance(account: string): Promise<bigint> {
    try {
      return await this.contract.assetBalance(account)
    } catch (error) {
      console.error('Error in assetBalance:', error)
      throw error
    }
  }

  async available(): Promise<bigint> {
    try {
      return await this.contract.available()
    } catch (error) {
      console.error('Error in available:', error)
      throw error
    }
  }

  async balanceOf(account: string): Promise<bigint> {
    try {
      return await this.contract.balanceOf(account)
    } catch (error) {
      console.error('Error in balanceOf:', error)
      throw error
    }
  }

  async baseBorrowAPY(): Promise<bigint> {
    try {
      return await this.contract.baseBorrowAPY()
    } catch (error) {
      console.error('Error in baseBorrowAPY:', error)
      throw error
    }
  }

  async baseSupplyAPY(): Promise<bigint> {
    try {
      return await this.contract.baseSupplyAPY()
    } catch (error) {
      console.error('Error in baseSuppyAPY:', error)
      throw error
    }
  }

  async borrowed(): Promise<bigint> {
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

  async collateralFactor(collateral: string): Promise<bigint> {
    try {
      return await this.contract.collateralFactor(collateral)
    } catch (error) {
      console.error('Error in collateralFactor:', error)
      throw error
    }
  }

  async collateralTokenList(collateral: string[]): Promise<string> {
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
      console.error('Error in collateralTokenTypes:', error)
      throw error
    }
  }

  async collaterals(): Promise<string[]> {
    try {
      return await this.contract.collaterals()
    } catch (error) {
      console.error('Error in collaterals:', error)
      throw error
    }
  }

  async convertToAssets(shares: bigint): Promise<bigint> {
    try {
      return await this.contract.convertToAssets(shares)
    } catch (error) {
      console.error('Error in convertToAssets:', error)
      throw error
    }
  }

  async convertToShares(assets: bigint): Promise<bigint> {
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

  async decimals(): Promise<number> {
    try {
      return await this.contract.decimals()
    } catch (error) {
      console.error('Error in decimals:', error)
      throw error
    }
  }

  async feesPaid(): Promise<bigint> {
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

  async getTokenCollateralValue(token: string, amount: bigint): Promise<bigint> {
    try {
      return await this.contract.getTokenCollateralValue(token, amount)
    } catch (error) {
      console.error('Error in getTokenCollateralValue:', error)
      throw error
    }
  }

  async getTokenMarketValue(token: string, amount: bigint): Promise<bigint> {
    try {
      return await this.contract.getTokenMarketValue(token, amount)
    } catch (error) {
      console.error('Error in getTokenMarketValue:', error)
      throw error
    }
  }

  async interestRatesModel(): Promise<string> {
    try {
      return await this.contract.interestRatesModel()
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

  async maxDeposit(amount: bigint): Promise<bigint> {
    try {
      return await this.contract.maxDeposit(amount)
    } catch (error) {
      console.error('Error in maxDeposit:', error)
      throw error
    }
  }

  async maxMint(amount: bigint): Promise<bigint> {
    try {
      return await this.contract.maxMint(amount)
    } catch (error) {
      console.error('Error in maxMint:', error)
      throw error
    }
  }

  async maxRedeem(owner: string): Promise<bigint> {
    try {
      return await this.contract.maxRedeem(owner)
    } catch (error) {
      console.error('Error in maxRedeem:', error)
      throw error
    }
  }

  async maxWithdraw(owner: string): Promise<bigint> {
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

  async owner(): Promise<bigint> {
    try {
      return await this.contract.owner()
    } catch (error) {
      console.error('Error in nonces:', error)
      throw error
    }
  }

  async nonces(address: string): Promise<bigint> {
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

  async previewDeposit(assets: bigint): Promise<bigint> {
    try {
      return await this.contract.previewDeposit(assets)
    } catch (error) {
      console.error('Error in previewDeposit:', error)
      throw error
    }
  }

  async previewMint(shares: bigint): Promise<bigint> {
    try {
      return await this.contract.previewMint(shares)
    } catch (error) {
      console.error('Error in previewMint:', error)
      throw error
    }
  }

  async previewRedeem(shares: bigint): Promise<bigint> {
    try {
      return await this.contract.previewRedeem(shares)
    } catch (error) {
      console.error('Error in previewMint:', error)
      throw error
    }
  }

  async previewWithdraw(assets: bigint): Promise<bigint> {
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

  async supplied(): Promise<bigint> {
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

  async tokenCollateralDeposited(collateral: string): Promise<bigint> {
    try {
      return await this.contract.tokenCollateralDeposited(collateral)
    } catch (error) {
      console.error('Error in tokenCollateralDeposited:', error)
      throw error
    }
  }

  async totalAccountCollateralValue(account: string): Promise<bigint> {
    try {
      return await this.contract.totalAccountCollateralValue(account)
    } catch (error) {
      console.error('Error in totalAccountCollateralValue:', error)
      throw error
    }
  }

  async totalAssets(): Promise<bigint> {
    try {
      return await this.contract.totalAssets()
    } catch (error) {
      console.error('Error in totalAssets:', error)
      throw error
    }
  }

  async totalSupply(): Promise<bigint> {
    try {
      return await this.contract.totalSupply()
    } catch (error) {
      console.error('Error in totalSupply:', error)
      throw error
    }
  }

  async tvl(): Promise<bigint> {
    try {
      return await this.contract.tvl()
    } catch (error) {
      console.error('Error in tvl:', error)
      throw error
    }
  }

  async utilization(): Promise<bigint> {
    try {
      return await this.contract.utilization()
    } catch (error) {
      console.error('Error in utilization:', error)
      throw error
    }
  }

  async getEventLogs<T>(
    eventType: string,
    fromBlock: string | number,
    toBlock: string | number,
  ): Promise<T[] | undefined> {
    try {
      const events = await this.contract.queryFilter(eventType, fromBlock, toBlock)
      return events.map((event: any) => event.args)
    } catch (error) {
      console.error('Error in getEventLogs:', error)
      throw error
    }
  }

  async stakePool(): Promise<string> {
    return await this.contract.stakingPool()
  }
}
