import { ethers, Signer } from 'ethers'
import { AccountActor } from '../accountActor'
import { mockAddress } from '../utils/constants'
import { mockPoolLens, mockAccountActor } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../accountActor', () => {
  return {
    AccountActor: jest.fn().mockImplementation(() => {
      return {
        ...mockAccountActor,
      }
    }),
  }
})

describe('AccountActor', () => {
  let accountActor: AccountActor
  let mockProvider: ethers.providers.JsonRpcProvider
  let mockSigner: Signer

  beforeEach(() => {
    mockProvider = new ethers.providers.WebSocketProvider('webSocketUrl')
    mockSigner = ethers.Wallet.createRandom()
    accountActor = new AccountActor(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(mockPoolLens.contract).not.toBeNull()
  })

  it('should return account summary', async () => {
    const account = '0x00'
    await accountActor.accountSummary(account)
    expect(mockAccountActor.accountSummary).toHaveBeenCalledWith(account)
  })

  it('should return claimable rewards', async () => {
    const account = '0x00'
    await accountActor.allClaimableRewards(account)
    expect(mockAccountActor.allClaimableRewards).toHaveBeenCalledWith(account)
  })

  it('should claim rewards', async () => {
    const account = '0x00'
    await accountActor.claimAllRewards(account)
    expect(mockAccountActor.claimAllRewards).toHaveBeenCalledWith(account)
  })

  it('should get all positions', async () => {
    const account = '0x00'
    await accountActor.allPositions(account, true)
    expect(mockAccountActor.allPositions).toHaveBeenCalledWith(account, true)
  })

  it('should get single position by pool', async () => {
    const poolAddress = mockAddress
    const account = '0x00'

    await accountActor.getPosition(account, poolAddress)
    expect(mockAccountActor.getPosition).toHaveBeenCalledWith(account, poolAddress)
  })
})
