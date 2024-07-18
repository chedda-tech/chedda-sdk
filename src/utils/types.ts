enum TokenType {
  ERC20,
  ERC721,
  ERC1155,
}

export interface IPoolStats {
  pool: string
  asset: string
  characterization: string
  supplied: bigint
  suppliedValue: bigint
  borrowed: bigint
  borrowedValue: bigint
  baseSupplyAPY: bigint
  maxSupplyAPY: bigint
  baseBorrowAPY: bigint
  maxBorrowAPY: bigint
  utilization: bigint
  feesPaid: bigint
  tvl: bigint
  collaterals: string[]
  dailyRewards: bigint
  rewardsAPY: bigint
}

export interface IAggregateStats {
  totalSuppliedValue: bigint
  totalBorrowedValue: bigint
  totalAvailableValue: bigint
  totalFeesPaid: bigint
  numberOfVaults: bigint
  tvl: bigint
}

export interface IPoolCollateralInfo {
  collateral: string
  amountDeposited: bigint
  value: bigint
  collateralFactor: bigint
}

export interface ICollateralDeposited {
  token: string
  tokenType: bigint
  amount: bigint
}

export interface IAccountCollateralDeposited {
  token: string
  decimals: number
  amount: bigint
  value: bigint
  tokenIds: bigint[]
}

export interface IAccountInfo {
  walletAssetBalance: bigint
  supplied: bigint
  borrowed: bigint
  decimals: number
  healthFactor: bigint
  totalCollateralValue: bigint
  collateralDeposited: IAccountCollateralDeposited[]
}

export interface ICollateralInfo {
  token: string
  collateralFactor: bigint
  tokenType: TokenType
}

export interface IInterestRates {
  supplyRate: bigint
  borrowRate: bigint
}

export interface IMarketInfo {
  oraclePrice: bigint
  oraclePriceDecimals: bigint
  interestFee: bigint
  supplyCap: bigint
  liquidity: bigint
  utilization: bigint
  liquidationThreshold: bigint
  liquidationPenalty: bigint
}

export interface IPoolState {
  pool: string
  timestamp: bigint
  supplied: bigint
  borrowed: bigint
  supplyRate: bigint
  borrowRate: bigint
}

export interface IInterestRatesProjection {
  utilization: bigint
  supplyRate: bigint
  borrowRate: bigint
}

export enum LockTime {
  zero,
  thirtyDays,
  ninetyDays,
  oneEightyDays,
  threeSixtyDays,
}

export interface Lock {
  amount: bigint
  timeWeighted: bigint
  expiry: bigint
  rewardDebt: bigint
  lockTime: LockTime
}

export interface INativeFee {
  nativeFee: bigint
}

export type SendParam = (string | number | bigint | Uint8Array)[]

export interface IAccountSummary {
  netValue: bigint
  suppliedValue: bigint
  borrowedValue: bigint
  lockedValue: bigint
}

export interface IClaimableRewards {
  reward1: bigint
  reward2: bigint
}

export interface IPosition {
  account: string
  pool: string
  asset: string
  decimals: number
  supplied: bigint
  borrowed: bigint
  suppliedValue: bigint
  borrowedValue: bigint
  collateralValue: bigint
  healthFactor: bigint
  staked: bigint
  locked: bigint
  stakeRewardsClaimable: bigint
  lockRewardsClaimable: bigint
  exposure: bigint
}
