import { ethers, JsonRpcSigner } from 'ethers'
import { InterestRatesProjector } from '../interestRatesProjector'
import { mockAddress } from '../utils/constants'
import { mockInterestRateProjector } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../interestRatesProjector', () => {
  return {
    InterestRatesProjector: jest.fn().mockImplementation(() => {
      return {
        ...mockInterestRateProjector,
      }
    }),
  }
})

describe('Interest Rate Projector', () => {
  let ratesProjector: InterestRatesProjector
  let mockProvider: ethers.JsonRpcProvider
  let mockSigner: JsonRpcSigner

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider('webSocketUrl')
    mockSigner = new ethers.JsonRpcSigner(mockProvider, '0x00')
    ratesProjector = new InterestRatesProjector(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(ratesProjector.contract).not.toBeNull()
  })

  it('should get interest projection', async () => {
    const interestRatesModel = mockAddress
    const utilizations = [BigInt(2), BigInt(4), BigInt(6)]
    await ratesProjector.projection(interestRatesModel, utilizations)
    expect(mockInterestRateProjector.projection).toHaveBeenCalled()
  })
})
