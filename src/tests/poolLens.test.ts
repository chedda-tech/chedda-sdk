import { ethers, JsonRpcSigner } from 'ethers'
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
  let mockProvider: ethers.JsonRpcProvider
  let mockSigner: JsonRpcSigner

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider('webSocketUrl')
    mockSigner = new ethers.JsonRpcSigner(mockProvider, '0x00')
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
})
