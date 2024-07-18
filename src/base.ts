import { ethers, Signer } from 'ethers'
import { ERC20Token } from './erc20Token'
import { LendingPool } from './lendingPool'
import { PriceOracle } from './priceOracle'
import { PoolLens } from './poolLens'
import { InterestRatesProjector } from './interestRatesProjector'
import { StakingPool } from './stakingPool'
import { CheddaLockingGauge } from './cheddaLockingGauge'
import { LockingGaugeRewardsDistributor } from './lockingGaugeRewardsDistributor'
import { CheddaToken } from './cheddaToken'
import { GenericOFT } from './genericOFT'
import { CheddaOFTAdapter } from './cheddaOFTAdapter'
import { CheddaTokenBridged } from './cheddaTokenBridged'
import { AccountActor } from './accountActor'

export class Chedda {
  provider: ethers.JsonRpcProvider

  constructor(provider: string) {
    this.provider = new ethers.JsonRpcProvider(provider, 'any')
  }

  lendingPool(address: string, signer: Signer) {
    return new LendingPool(this.provider, address, signer)
  }

  erc20token(address: string, signer: Signer) {
    return new ERC20Token(this.provider, address, signer)
  }

  poolLens(address: string, signer: Signer) {
    return new PoolLens(this.provider, address, signer)
  }

  interestRateProjector(address: string, signer: Signer) {
    return new InterestRatesProjector(this.provider, address, signer)
  }

  priceOracle(address: string) {
    return new PriceOracle(this.provider, address)
  }

  stakingPool(address: string, signer: Signer) {
    return new StakingPool(this.provider, address, signer)
  }

  cheddaLockingGauge(address: string, signer: Signer) {
    return new CheddaLockingGauge(this.provider, address, signer)
  }

  lockingGaugeRewardsDistributor(address: string, signer: Signer) {
    return new LockingGaugeRewardsDistributor(this.provider, address, signer)
  }

  cheddaToken(address: string, signer: Signer) {
    return new CheddaToken(this.provider, address, signer)
  }

  cheddaTokenBridged(address: string, signer: Signer) {
    return new CheddaTokenBridged(this.provider, address, signer)
  }

  genericOFT(address: string, signer: Signer) {
    return new GenericOFT(this.provider, address, signer)
  }

  cheddaOFTAdapter(address: string, signer: Signer) {
    return new CheddaOFTAdapter(this.provider, address, signer)
  }

  accountActor(address: string, signer: Signer) {
    return new AccountActor(this.provider, address, signer)
  }
}
