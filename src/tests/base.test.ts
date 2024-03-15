import { ethers, Signer } from 'ethers'
import { Chedda } from '../base'
import { mockAddress, webSocketUrl } from '../utils/constants'

// Mock WebSocketProvider class
jest.mock('ethers')

describe('Chedda', () => {
  let chedda: Chedda
  let signer: Signer

  // Set up Chedda instance before the tests
  beforeAll(() => {
    chedda = new Chedda(webSocketUrl)
    signer = ethers.Wallet.createRandom()
  })

  it('should create a Chedda instance', () => {
    expect(chedda).toBeInstanceOf(Chedda)
    expect(chedda.provider).toBeDefined()
  })

  it('should create a CheddaVault instance', () => {
    const lendingPool = chedda.lendingPool(mockAddress, signer)
    expect(lendingPool).toBeDefined()
  })

  it('should create an erc20Token instance', () => {
    const erc20token = chedda.erc20token(mockAddress, signer)
    expect(erc20token).toBeDefined()
  })

  it('should create a pool lens instance', () => {
    const poolLens = chedda.poolLens(mockAddress, signer)
    expect(poolLens).toBeDefined()
  })

  it('should create a PriceOracle instance', () => {
    const priceOracle = chedda.priceOracle(mockAddress)
    expect(priceOracle).toBeDefined()
  })

  it('should create an interestRateProjector instance', () => {
    const rateProjector = chedda.interestRateProjector(mockAddress, signer)
    expect(rateProjector).toBeDefined()
  })

  it('should create a stakingPool instance', () => {
    const rateProjector = chedda.stakingPool(mockAddress, signer)
    expect(rateProjector).toBeDefined()
  })
})
