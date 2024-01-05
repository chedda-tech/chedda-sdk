import { BigNumber, ethers, Signer } from 'ethers'
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
  let mockProvider: ethers.providers.WebSocketProvider
  let mockSigner: Signer

  beforeEach(() => {
    mockProvider = new ethers.providers.WebSocketProvider('webSocketUrl')
    mockSigner = ethers.Wallet.createRandom()
    ratesProjector = new InterestRatesProjector(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(ratesProjector.contract).not.toBeNull()
  })

  it('should get interest projection', async () => {
    const interestRatesModel = mockAddress
    const utilizations = [BigNumber.from(2), BigNumber.from(4), BigNumber.from(6)]
    await ratesProjector.projection(interestRatesModel, utilizations)
    expect(mockInterestRateProjector.projection).toHaveBeenCalled()
  })
})
