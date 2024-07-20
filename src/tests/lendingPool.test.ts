import { ethers, JsonRpcSigner } from 'ethers'
import { LendingPool } from '../lendingPool'
import { mockAddress, webSocketUrl } from '../utils/constants'
import { mockLendingPool } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../lendingPool', () => {
  return {
    LendingPool: jest.fn().mockImplementation(() => {
      return {
        ...mockLendingPool,
      }
    }),
  }
})

describe('LendingPool', () => {
  let lendingPool: LendingPool
  let mockProvider: ethers.JsonRpcProvider
  let mockSigner: JsonRpcSigner

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider(webSocketUrl)
    mockSigner = new ethers.JsonRpcSigner(mockProvider, '0x00')
    lendingPool = new LendingPool(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(lendingPool.contract).not.toBeNull()
  })

  it('should add collateral', async () => {
    const token = mockAddress
    const amount = BigInt(100)

    await lendingPool.addCollateral(token, amount)
    expect(mockLendingPool.addCollateral).toHaveBeenCalledWith(token, amount)
  })

  it('should approve', async () => {
    const spender = mockAddress
    const amount = BigInt(100)

    await lendingPool.approve(spender, amount)
    expect(mockLendingPool.approve).toHaveBeenCalledWith(spender, amount)
  })

  it('should deposit assets', async () => {
    const assets = BigInt(100)
    const receiver = mockAddress

    await lendingPool.depositAsset(assets, receiver)
    expect(mockLendingPool.depositAsset).toHaveBeenCalledWith(assets, receiver)
  })

  it('should mint assets', async () => {
    const shares = BigInt(100)
    const receiver = mockAddress

    await lendingPool.mintAsset(shares, receiver)
    expect(mockLendingPool.mintAsset).toHaveBeenCalledWith(shares, receiver)
  })

  it('should put amount', async () => {
    const amount = BigInt(100)

    await lendingPool.putAmount(amount)

    expect(mockLendingPool.putAmount).toHaveBeenCalledWith(amount)
  })

  it('should put shares', async () => {
    const shares = BigInt(100)

    await lendingPool.putShares(shares)
    expect(mockLendingPool.putShares).toHaveBeenCalledWith(shares)
  })

  it('should redeem assets', async () => {
    const shares = BigInt(100)
    const receiver = mockAddress
    const owner = mockAddress

    await lendingPool.redeem(shares, receiver, owner)
    expect(mockLendingPool.redeem).toHaveBeenCalledWith(shares, receiver, owner)
  })

  it('should remove collateral', async () => {
    const token = mockAddress
    const amount = BigInt(100)

    await lendingPool.removeCollateral(token, amount)
    expect(mockLendingPool.removeCollateral).toHaveBeenCalledWith(token, amount)
  })

  it('should renounce ownership', async () => {
    await lendingPool.renounceOwnerShip()
    expect(mockLendingPool.renounceOwnerShip).toHaveBeenCalled()
  })

  it('should set gauge', async () => {
    const gauge = mockAddress

    await lendingPool.setGauge(gauge)
    expect(mockLendingPool.setGauge).toHaveBeenCalledWith(gauge)
  })

  it('should supply assets', async () => {
    const amount = BigInt(100)
    const receiver = mockAddress
    const useAsCollateral = true

    await lendingPool.supply(amount, receiver, useAsCollateral)
    expect(mockLendingPool.supply).toHaveBeenCalledWith(amount, receiver, useAsCollateral)
  })

  it('should take assets', async () => {
    const amount = BigInt(100)

    await lendingPool.take(amount)

    expect(mockLendingPool.take).toHaveBeenCalledWith(amount)
  })

  it('should transfer assets', async () => {
    const to = mockAddress
    const amount = BigInt(100)

    await lendingPool.transfer(to, amount)
    expect(mockLendingPool.transfer).toHaveBeenCalledWith(to, amount)
  })

  it('should transfer from', async () => {
    const from = mockAddress
    const to = mockAddress
    const amount = BigInt(100)

    await lendingPool.transferFrom(from, to, amount)
    expect(mockLendingPool.transferFrom).toHaveBeenCalledWith(from, to, amount)
  })

  it('should transfer ownership', async () => {
    const newOwner = mockAddress

    await lendingPool.transferOwnership(newOwner)
    expect(mockLendingPool.transferOwnership).toHaveBeenCalledWith(newOwner)
  })

  it('should get account assets borrowed', async () => {
    const account = mockAddress

    await lendingPool.accountAssetsBorrowed(account)
    expect(mockLendingPool.accountAssetsBorrowed).toHaveBeenCalledWith(account)
  })

  it('should get account collateral amount', async () => {
    const account = mockAddress
    const collateral = mockAddress

    await lendingPool.accountCollateralAmount(account, collateral)
    expect(mockLendingPool.accountCollateralAmount).toHaveBeenCalledWith(account, collateral)
  })

  it('should get account collateral deposited', async () => {
    const account = mockAddress
    const collateral = mockAddress

    await lendingPool.accountCollateralDeposited(account, collateral)
    expect(mockLendingPool.accountCollateralDeposited).toHaveBeenCalledWith(account, collateral)
  })

  it('should get account collateral token ids', async () => {
    const account = mockAddress
    const collateral = mockAddress

    await lendingPool.accountCollateralTokenIds(account, collateral)
    expect(mockLendingPool.accountCollateralTokenIds).toHaveBeenCalledWith(account, collateral)
  })

  it('should get account health', async () => {
    const account = mockAddress

    await lendingPool.accountHealth(account)
    expect(mockLendingPool.accountHealth).toHaveBeenCalledWith(account)
  })

  it('should get allowance', async () => {
    const account = mockAddress
    const spender = mockAddress

    await lendingPool.allowance(account, spender)
    expect(mockLendingPool.allowance).toHaveBeenCalledWith(account, spender)
  })

  it('should get asset', async () => {
    await lendingPool.asset()
    expect(mockLendingPool.asset).toHaveBeenCalled()
  })

  it('should get asset balance', async () => {
    const account = mockAddress

    await lendingPool.assetBalance(account)
    expect(mockLendingPool.assetBalance).toHaveBeenCalledWith(account)
  })

  it('should get available', async () => {
    await lendingPool.available()

    expect(mockLendingPool.available).toHaveBeenCalled()
  })

  it('should get balance of', async () => {
    const account = mockAddress

    await lendingPool.balanceOf(account)
    expect(mockLendingPool.balanceOf).toHaveBeenCalledWith(account)
  })

  it('should get base borrow APY', async () => {
    await lendingPool.baseBorrowAPY()
    expect(mockLendingPool.baseBorrowAPY).toHaveBeenCalled()
  })

  it('should get base supply APY', async () => {
    await lendingPool.baseSupplyAPY()
    expect(mockLendingPool.baseSupplyAPY).toHaveBeenCalled()
  })

  it('should get borrowed', async () => {
    await lendingPool.borrowed()
    expect(mockLendingPool.borrowed).toHaveBeenCalled()
  })

  it('should get characterization', async () => {
    await lendingPool.characterization()
    expect(mockLendingPool.characterization).toHaveBeenCalled()
  })

  it('should check if collateral is allowed', async () => {
    const collateral = mockAddress

    await lendingPool.collateralAllowed(collateral)
    expect(mockLendingPool.collateralAllowed).toHaveBeenCalledWith(collateral)
  })

  it('should get collateral factor', async () => {
    const collateral = mockAddress

    await lendingPool.collateralFactor(collateral)
    expect(mockLendingPool.collateralFactor).toHaveBeenCalledWith(collateral)
  })

  it('should get collateral token list', async () => {
    const collateral = [...mockAddress]

    await lendingPool.collateralTokenList(collateral)
    expect(mockLendingPool.collateralTokenList).toHaveBeenCalledWith(collateral)
  })

  it('should get collateral token types', async () => {
    const collateral = mockAddress

    await lendingPool.collateralTokenTypes(collateral)
    expect(mockLendingPool.collateralTokenTypes).toHaveBeenCalledWith(collateral)
  })

  it('should get collaterals', async () => {
    await lendingPool.collaterals()
    expect(mockLendingPool.collaterals).toHaveBeenCalledWith()
  })

  it('should convert shares to assets', async () => {
    const shares = BigInt(100)

    await lendingPool.convertToAssets(shares)
    expect(mockLendingPool.convertToAssets).toHaveBeenCalledWith(shares)
  })

  it('should convert assets to shares', async () => {
    const assets = BigInt(100)

    await lendingPool.convertToShares(assets)
    expect(mockLendingPool.convertToShares).toHaveBeenCalledWith(assets)
  })

  it('should get debt token', async () => {
    await lendingPool.debtToken()
    expect(mockLendingPool.debtToken).toHaveBeenCalled()
  })

  it('should get decimals', async () => {
    await lendingPool.decimals()
    expect(mockLendingPool.decimals).toHaveBeenCalled()
  })

  it('should get fees paid', async () => {
    await lendingPool.feesPaid()
    expect(mockLendingPool.feesPaid).toHaveBeenCalled()
  })

  it('should get gauge', async () => {
    await lendingPool.gauge()
    expect(mockLendingPool.gauge).toHaveBeenCalled()
  })

  it('should get token collateral value', async () => {
    const token = mockAddress
    const amount = BigInt(100)

    await lendingPool.getTokenCollateralValue(token, amount)
    expect(mockLendingPool.getTokenCollateralValue).toHaveBeenCalledWith(token, amount)
  })

  it('should get token market value', async () => {
    const token = mockAddress
    const amount = BigInt(100)

    await lendingPool.getTokenMarketValue(token, amount)
    expect(mockLendingPool.getTokenMarketValue).toHaveBeenCalledWith(token, amount)
  })

  it('should get interest rate model', async () => {
    await lendingPool.interestRatesModel()
    expect(mockLendingPool.interestRatesModel).toHaveBeenCalled()
  })

  it('should get interest rates', async () => {
    await lendingPool.interestRates()
    expect(mockLendingPool.interestRates).toHaveBeenCalled()
  })

  it('should get max deposit', async () => {
    const amount = BigInt(100)

    await lendingPool.maxDeposit(amount)
    expect(mockLendingPool.maxDeposit).toHaveBeenCalledWith(amount)
  })

  it('should get max mint', async () => {
    const amount = BigInt(100)

    await lendingPool.maxMint(amount)
    expect(mockLendingPool.maxMint).toHaveBeenCalledWith(amount)
  })

  it('should get max redeem', async () => {
    const owner = mockAddress

    await lendingPool.maxRedeem(owner)
    expect(mockLendingPool.maxRedeem).toHaveBeenCalledWith(owner)
  })

  it('should get max withdraw', async () => {
    const owner = mockAddress

    await lendingPool.maxWithdraw(owner)
    expect(mockLendingPool.maxWithdraw).toHaveBeenCalledWith(owner)
  })

  it('should get name', async () => {
    await lendingPool.name()
    expect(mockLendingPool.name).toHaveBeenCalled()
  })

  it('should get owner', async () => {
    await lendingPool.owner()
    expect(mockLendingPool.owner).toHaveBeenCalled()
  })

  it('should get nonces', async () => {
    const address = mockAddress

    await lendingPool.nonces(address)
    expect(mockLendingPool.nonces).toHaveBeenCalledWith(address)
  })

  it('should get poolasset', async () => {
    await lendingPool.poolAsset()
    expect(mockLendingPool.poolAsset).toHaveBeenCalled()
  })

  it('should preview deposit', async () => {
    const assets = BigInt(100)

    await lendingPool.previewDeposit(assets)
    expect(mockLendingPool.previewDeposit).toHaveBeenCalledWith(assets)
  })

  it('should preview mint', async () => {
    const shares = BigInt(100)

    await lendingPool.previewMint(shares)
    expect(mockLendingPool.previewMint).toHaveBeenCalledWith(shares)
  })

  it('should preview redeem', async () => {
    const shares = BigInt(100)

    await lendingPool.previewRedeem(shares)
    expect(mockLendingPool.previewRedeem).toHaveBeenCalledWith(shares)
  })

  it('should preview withdraw', async () => {
    const shares = BigInt(100)

    await lendingPool.previewWithdraw(shares)
    expect(mockLendingPool.previewWithdraw).toHaveBeenCalledWith(shares)
  })

  it('should get price feed', async () => {
    await lendingPool.priceFeed()
    expect(mockLendingPool.priceFeed).toHaveBeenCalled()
  })

  it('should get supplied', async () => {
    await lendingPool.supplied()
    expect(mockLendingPool.supplied).toHaveBeenCalledWith()
  })

  it('should get symbol', async () => {
    await lendingPool.symbol()
    expect(mockLendingPool.symbol).toHaveBeenCalled()
  })

  it('should get total account collateral value', async () => {
    const owner = mockAddress

    await lendingPool.totalAccountCollateralValue(owner)
    expect(mockLendingPool.totalAccountCollateralValue).toHaveBeenCalledWith(owner)
  })

  it('should get total assets', async () => {
    await lendingPool.totalAssets()
    expect(mockLendingPool.totalAssets).toHaveBeenCalled()
  })

  it('should get total supply', async () => {
    await lendingPool.totalSupply()
    expect(mockLendingPool.totalSupply).toHaveBeenCalled()
  })

  it('should get TVL', async () => {
    await lendingPool.tvl()
    expect(mockLendingPool.tvl).toHaveBeenCalled()
  })

  it('should get utilization', async () => {
    await lendingPool.utilization()
    expect(mockLendingPool.utilization).toHaveBeenCalled()
  })

  it('should get poolstate event', async () => {
    const eventType = 'Transfer'
    const fromBlock = 0
    const ToBlock = 'latest'
    await lendingPool.getEventLogs(eventType, fromBlock, ToBlock)
    expect(mockLendingPool.getEventLogs).toHaveBeenCalledWith(eventType, fromBlock, ToBlock)
  })
})
