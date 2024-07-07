import { BigNumber } from 'ethers'

enum TokenType {
  ERC20,
  ERC721,
  ERC1155,
}

export interface IPoolStats {
  pool: string
  asset: string
  characterization: string
  supplied: BigNumber
  suppliedValue: BigNumber
  borrowed: BigNumber
  borrowedValue: BigNumber
  baseSupplyAPY: BigNumber
  maxSupplyAPY: BigNumber
  baseBorrowAPY: BigNumber
  maxBorrowAPY: BigNumber
  utilization: BigNumber
  feesPaid: BigNumber
  tvl: BigNumber
  collaterals: string[]
  dailyRewards: BigNumber
}

export interface IAggregateStats {
  totalSuppliedValue: BigNumber
  totalBorrowedValue: BigNumber
  totalAvailableValue: BigNumber
  totalFeesPaid: BigNumber
  numberOfVaults: BigNumber
  tvl: BigNumber
}

export interface IPoolCollateralInfo {
  collateral: string
  amountDeposited: BigNumber
  value: BigNumber
  collateralFactor: BigNumber
}

export interface ICollateralDeposited {
  token: string
  tokenType: BigNumber
  amount: BigNumber
}

export interface IAccountCollateralDeposited {
  token: string
  decimals: number
  amount: BigNumber
  value: BigNumber
  tokenIds: BigNumber[]
}

export interface IAccountInfo {
  walletAssetBalance: BigNumber
  supplied: BigNumber
  borrowed: BigNumber
  decimals: number
  healthFactor: BigNumber
  totalCollateralValue: BigNumber
  collateralDeposited: IAccountCollateralDeposited[]
}

export interface ICollateralInfo {
  token: string
  collateralFactor: BigNumber
  tokenType: TokenType
}

export interface IInterestRates {
  supplyRate: BigNumber
  borrowRate: BigNumber
}

export interface IMarketInfo {
  oraclePrice: BigNumber
  oraclePriceDecimals: BigNumber
  interestFee: BigNumber
  supplyCap: BigNumber
  liquidity: BigNumber
  utilization: BigNumber
  liquidationThreshold: BigNumber
  liquidationPenalty: BigNumber
}

export interface IPoolState {
  pool: string
  timestamp: BigNumber
  supplied: BigNumber
  borrowed: BigNumber
  supplyRate: BigNumber
  borrowRate: BigNumber
}

export interface IInterestRatesProjection {
  utilization: BigNumber
  supplyRate: BigNumber
  borrowRate: BigNumber
}

export enum LockTime {
  zero,
  thirtyDays,
  ninetyDays,
  oneEightyDays,
  threeSixtyDays,
}

export interface Lock {
  amount: BigNumber
  timeWeighted: BigNumber
  expiry: BigNumber
  rewardDebt: BigNumber
  lockTime: LockTime
}

export interface INativeFee {
  nativeFee: BigNumber
}

export type SendParam = (string | number | BigNumber | Uint8Array)[]

export interface IAccountSummary {
  netValue: BigNumber
  suppliedValue: BigNumber
  borrowedValue: BigNumber
  lockedValue: BigNumber
}

export interface IClaimableRewards {
  reward1: BigNumber
  reward2: BigNumber
}

export interface IPosition {
  account: string
  pool: string
  asset: string
  decimals: number
  supplied: BigNumber
  borrowed: BigNumber
  suppliedValue: BigNumber
  borrowedValue: BigNumber
  collateralValue: BigNumber
  healthFactor: BigNumber
  staked: BigNumber
  locked: BigNumber
  stakeRewardsClaimable: BigNumber
  lockRewardsClaimable: BigNumber
  exposure: BigNumber
}
