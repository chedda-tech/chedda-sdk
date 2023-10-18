import { CheddaVault } from '../vault'

export const mockCheddaVault: Partial<CheddaVault> = {
  depositAsset: jest.fn(),
  redeem: jest.fn(),
  addCollateral: jest.fn(),
  removeCollateral: jest.fn(),
  accountCollateralTokenIds: jest.fn(),
  borrow: jest.fn(),
  repay: jest.fn(),
  collateral: jest.fn(),
  totalAssets: jest.fn(),
  collateralAmounts: jest.fn(),
  utilization: jest.fn(),
  totalAccountCollateralValue: jest.fn(),
  depositApr: jest.fn(),
  borrowApr: jest.fn(),
  rewardsApr: jest.fn(),
  getVaultStats: jest.fn(),
  approve: jest.fn(),
  allowance: jest.fn(),
  balanceOf: jest.fn(),
  transfer: jest.fn(),
  totalSupply: jest.fn(),
  gauge: jest.fn(),
  accountPendingAmount: jest.fn(),
  initiateContract: jest.fn(),
}

export const mockTokenService = {
  name: jest.fn(),
  symbol: jest.fn(),
  approve: jest.fn(),
  allowance: jest.fn(),
  balanceOf: jest.fn(),
  ownedTokens: jest.fn(),
  transfer: jest.fn(),
  totalSupply: jest.fn(),
}
