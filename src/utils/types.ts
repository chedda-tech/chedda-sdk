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
