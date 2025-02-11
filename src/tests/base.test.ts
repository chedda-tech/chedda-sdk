import { ethers, JsonRpcProvider, JsonRpcSigner } from 'ethers'
import { Chedda } from '../base'
import { mockAddress, webSocketUrl } from '../utils/constants'

// Mock WebSocketProvider class
jest.mock('ethers')

describe('Chedda', () => {
  let chedda: Chedda
  let signer: JsonRpcSigner
  let mockProvider: JsonRpcProvider

  // Set up Chedda instance before the tests
  beforeAll(() => {
    chedda = new Chedda(webSocketUrl)
    mockProvider = new ethers.JsonRpcProvider(webSocketUrl)
    signer = new ethers.JsonRpcSigner(mockProvider, '0x00')
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

  it('should create a DIA oriceOracle instance', () => {
    const diaPriceOracle = chedda.diaPriceOracle(mockAddress)
    expect(diaPriceOracle).toBeDefined()
  })

  it('should create an interestRateProjector instance', () => {
    const rateProjector = chedda.interestRateProjector(mockAddress, signer)
    expect(rateProjector).toBeDefined()
  })

  it('should create a stakingPool instance', () => {
    const stakingPool = chedda.stakingPool(mockAddress, signer)
    expect(stakingPool).toBeDefined()
  })

  it('should create a cheddaLockingGauge instance', () => {
    const cheddaLockingGauge = chedda.cheddaLockingGauge(mockAddress, signer)
    expect(cheddaLockingGauge).toBeDefined()
  })

  it('should create a lockingGaugeRewardsDistributor instance', () => {
    const lockingGaugeRewardsDistributor = chedda.lockingGaugeRewardsDistributor(mockAddress, signer)
    expect(lockingGaugeRewardsDistributor).toBeDefined()
  })

  it('should create a cheddaToken instance', () => {
    const cheddaToken = chedda.cheddaToken(mockAddress, signer)
    expect(cheddaToken).toBeDefined()
  })

  it('should create a cheddaTokenBridged instance', () => {
    const cheddaTokenBridged = chedda.cheddaTokenBridged(mockAddress, signer)
    expect(cheddaTokenBridged).toBeDefined()
  })

  it('should create a cheddaOFTAdapter instance', () => {
    const cheddaOFTAdapter = chedda.cheddaOFTAdapter(mockAddress, signer)
    expect(cheddaOFTAdapter).toBeDefined()
  })

  it('should create a cxToken instance', () => {
    const cxToken = chedda.cxToken(mockAddress, signer)
    expect(cxToken).toBeDefined()
  })

  it('should create a accountActor instance', () => {
    const accountActor = chedda.accountActor(mockAddress, signer)
    expect(accountActor).toBeDefined()
  })
})
