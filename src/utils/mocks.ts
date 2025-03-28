import { AccountActor } from '../accountActor'
import { CheddaLockingGauge } from '../cheddaLockingGauge'
import { LendingPool } from '../lendingPool'
import { LockingGaugeRewardsDistributor } from '../lockingGaugeRewardsDistributor'
import { PoolLens } from '../poolLens'
import { PriceOracle } from '../priceOracle'
import { StakingPool } from '../stakingPool'

export const mockLendingPool: Partial<LendingPool> = {
  addCollateral: jest.fn(),
  approve: jest.fn(),
  depositAsset: jest.fn(),
  mintAsset: jest.fn(),
  putAmount: jest.fn(),
  putShares: jest.fn(),
  redeem: jest.fn(),
  removeCollateral: jest.fn(),
  renounceOwnerShip: jest.fn(),
  setGauge: jest.fn(),
  supply: jest.fn(),
  take: jest.fn(),
  transfer: jest.fn(),
  transferFrom: jest.fn(),
  transferOwnership: jest.fn(),
  withdraw: jest.fn(),
  assetsBorrowed: jest.fn(),
  accountCollateralAmount: jest.fn(),
  accountCollateralDeposited: jest.fn(),
  accountCollateralTokenIds: jest.fn(),
  accountHealth: jest.fn(),
  allowance: jest.fn(),
  asset: jest.fn(),
  assetBalance: jest.fn(),
  available: jest.fn(),
  balanceOf: jest.fn(),
  baseBorrowAPY: jest.fn(),
  baseSupplyAPY: jest.fn(),
  borrowed: jest.fn(),
  characterization: jest.fn(),
  collateralAllowed: jest.fn(),
  collateralFactor: jest.fn(),
  collateralTokenList: jest.fn(),
  collateralTokenTypes: jest.fn(),
  collaterals: jest.fn(),
  convertToAssets: jest.fn(),
  convertToShares: jest.fn(),
  debtToken: jest.fn(),
  decimals: jest.fn(),
  feesPaid: jest.fn(),
  gauge: jest.fn(),
  tokenLoanValue: jest.fn(),
  tokenMarketValue: jest.fn(),
  interestRatesModel: jest.fn(),
  interestRates: jest.fn(),
  maxDeposit: jest.fn(),
  maxMint: jest.fn(),
  maxRedeem: jest.fn(),
  maxWithdraw: jest.fn(),
  name: jest.fn(),
  owner: jest.fn(),
  nonces: jest.fn(),
  poolAsset: jest.fn(),
  previewDeposit: jest.fn(),
  previewMint: jest.fn(),
  previewRedeem: jest.fn(),
  previewWithdraw: jest.fn(),
  priceFeed: jest.fn(),
  supplied: jest.fn(),
  symbol: jest.fn(),
  tokenCollateralDeposited: jest.fn(),
  accountMaxLoanValue: jest.fn(),
  totalAssets: jest.fn(),
  totalSupply: jest.fn(),
  tvl: jest.fn(),
  utilization: jest.fn(),
  getEventLogs: jest.fn(),
}

export const mockPoolLens: Partial<PoolLens> = {
  activePools: jest.fn(),
  getAggregateStats: jest.fn(),
  getMarketInfo: jest.fn(),
  getPoolAccountInfo: jest.fn(),
  getPoolCollateral: jest.fn(),
  getPoolStats: jest.fn(),
  getPoolStatsList: jest.fn(),
  owner: jest.fn(),
  registeredPools: jest.fn(),
}

export const mockERC20Token = {
  name: jest.fn(),
  symbol: jest.fn(),
  approve: jest.fn(),
  allowance: jest.fn(),
  balanceOf: jest.fn(),
  ownedTokens: jest.fn(),
  transfer: jest.fn(),
  totalSupply: jest.fn(),
}

export const mockERC721Token = {
  name: jest.fn(),
  symbol: jest.fn(),
  approve: jest.fn(),
  allowance: jest.fn(),
  balanceOf: jest.fn(),
  ownedTokens: jest.fn(),
  transfer: jest.fn(),
  totalSupply: jest.fn(),
}

export const mockInterestRateProjector = {
  projection: jest.fn(),
}

export const mockPriceOracle: Partial<PriceOracle> = {
  readPrice: jest.fn(),
  decimals: jest.fn(),
  token: jest.fn(),
}

export const mockStakingPool: Partial<StakingPool> = {
  stake: jest.fn(),
  unStake: jest.fn(),
  claim: jest.fn(),
  claimable: jest.fn(),
  stakingBalance: jest.fn(),
  addRewards: jest.fn(),
}

export const mockCheddaLockingGauge: Partial<CheddaLockingGauge> = {
  addToLock: jest.fn(),
  extendLock: jest.fn(),
  createLock: jest.fn(),
  withdraw: jest.fn(),
  getLock: jest.fn(),
  claim: jest.fn(),
  claimable: jest.fn(),
  addRewards: jest.fn(),
  token: jest.fn(),
  rewardPerShare: jest.fn(),
  totalWeight: jest.fn(),
  totalLocked: jest.fn(),
  totalClaimed: jest.fn(),
  totalRewards: jest.fn(),
  weight: jest.fn(),
  numberOfLocks: jest.fn(),
}

export const mockLockingGaugeRewardsDistributor: Partial<LockingGaugeRewardsDistributor> = {
  registerPool: jest.fn(),
  unregisterPool: jest.fn(),
  distribute: jest.fn(),
  totalWeightSum: jest.fn(),
  token: jest.fn(),
  pools: jest.fn(),
  Konstant: jest.fn(),
  lockingPortion: jest.fn(),
  stakingPortion: jest.fn(),
}

export const mockAccountActor: Partial<AccountActor> = {
  accountSummary: jest.fn(),
  allClaimableRewards: jest.fn(),
  claimAllRewards: jest.fn(),
  allPositions: jest.fn(),
  getPosition: jest.fn(),
}
