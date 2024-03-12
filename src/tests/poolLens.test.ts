import { ethers, Signer } from 'ethers'
import { PoolLens } from '../poolLens'
import { mockAddress } from '../utils/constants'
import { mockPoolLens } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../poolLens', () => {
  return {
    PoolLens: jest.fn().mockImplementation(() => {
      return {
        ...mockPoolLens,
      }
    }),
  }
})

describe('PoolLens', () => {
  let poolLens: PoolLens
  let mockProvider: ethers.providers.JsonRpcProvider
  let mockSigner: Signer

  beforeEach(() => {
    mockProvider = new ethers.providers.WebSocketProvider('webSocketUrl')
    mockSigner = ethers.Wallet.createRandom()
    poolLens = new PoolLens(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(mockPoolLens.contract).not.toBeNull()
  })

  it('should get active pools', async () => {
    await poolLens.activePools()
    expect(mockPoolLens.activePools).toHaveBeenCalled()
  })

  it('should get aggregate stats', async () => {
    await poolLens.getAggregateStats(true)
    expect(mockPoolLens.getAggregateStats).toHaveBeenCalled()
  })

  it('should get pool market information', async () => {
    const poolAddress = mockAddress

    await poolLens.getMarketInfo(poolAddress)
    expect(mockPoolLens.getMarketInfo).toHaveBeenCalledWith(poolAddress)
  })

  it('should get pool account information', async () => {
    const poolAddress = mockAddress
    const account = mockAddress

    await poolLens.getPoolAccountInfo(poolAddress, account)
    expect(mockPoolLens.getPoolAccountInfo).toHaveBeenCalledWith(poolAddress, account)
  })

  it('should get pool collateral', async () => {
    const poolAddress = mockAddress

    await poolLens.getPoolCollateral(poolAddress)
    expect(mockPoolLens.getPoolCollateral).toHaveBeenCalledWith(poolAddress)
  })

  it('should get pool stats', async () => {
    const poolAddress = mockAddress

    await poolLens.getPoolStats(poolAddress)
    expect(mockPoolLens.getPoolStats).toHaveBeenCalledWith(poolAddress)
  })

  it('should get pool stats list', async () => {
    const pools = ['PoolAddress1', 'PoolAddress2']

    await poolLens.getPoolStatsList(pools)
    expect(mockPoolLens.getPoolStatsList).toHaveBeenCalledWith(pools)
  })

  it('should get owner', async () => {
    await poolLens.owner()
    expect(mockPoolLens.owner).toHaveBeenCalled()
  })

  it('should get registered pools', async () => {
    await poolLens.registeredPools()
    expect(mockPoolLens.registeredPools).toHaveBeenCalled()
  })

  it('should register pools', async () => {
    const pool = mockAddress
    const isActive = true

    await poolLens.registerPool(pool, isActive)
    expect(mockPoolLens.registerPool).toHaveBeenCalledWith(pool, isActive)
  })

  it('should renounce ownership', async () => {
    await poolLens.renounceOwnership()
    expect(mockPoolLens.renounceOwnership).toHaveBeenCalled()
  })

  it('should set pool as active', async () => {
    const pool = mockAddress
    const isActive = true

    await poolLens.setActive(pool, isActive)
    expect(mockPoolLens.setActive).toHaveBeenCalledWith(pool, isActive)
  })

  it('should transfer ownership', async () => {
    const newOwner = mockAddress

    await poolLens.transferOwnership(newOwner)
    expect(mockPoolLens.transferOwnership).toHaveBeenCalledWith(newOwner)
  })

  it('should unregister pool', async () => {
    const pool = mockAddress

    await poolLens.unregisterPool(pool)
    expect(mockPoolLens.unregisterPool).toHaveBeenCalledWith(pool)
  })
})
