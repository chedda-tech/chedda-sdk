import { ethers } from 'ethers'
import { PriceOracle } from '../priceOracle'
import { mockAddress } from '../utils/constants'
import { mockPriceOracle } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../priceOracle', () => {
  return {
    PriceOracle: jest.fn().mockImplementation(() => {
      return {
        ...mockPriceOracle,
      }
    }),
  }
})

describe('PoolLens', () => {
  let priceOracle: PriceOracle
  let mockProvider: ethers.JsonRpcProvider

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider('webSocketUrl')
    priceOracle = new PriceOracle(mockProvider, mockAddress)
  })

  it('should initiate the contract', () => {
    expect(mockPriceOracle.contract).not.toBeNull()
  })

  it('should get active pools', async () => {
    await priceOracle.readPrice('0x00')
    expect(mockPriceOracle.readPrice).toHaveBeenCalled()
  })

  it('should get active pools', async () => {
    await priceOracle.decimals()
    expect(mockPriceOracle.decimals).toHaveBeenCalled()
  })

  it('should get aggregate stats', async () => {
    await priceOracle.token()
    expect(mockPriceOracle.token).toHaveBeenCalled()
  })
})
