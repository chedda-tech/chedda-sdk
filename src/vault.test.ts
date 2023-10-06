import { ethers, Signer } from 'ethers'
import { address, webSocketUrl } from './constants'
import { CheddaVault } from './vault'

// Mock the depositAsset method
const mockDeposit = jest.fn()
const mockApprove = jest.fn()
const mockAddCollateral = jest.fn()

// Mock WebSocketProvider class
jest.mock('ethers')

jest.mock('./vault', () => {
  return {
    CheddaVault: jest.fn().mockImplementation(() => {
      return {
        depositAsset: mockDeposit,
        approve: mockApprove,
        addCollateral: mockAddCollateral,
      }
    }),
  }
})

describe('Chedda vault', () => {
  let cheddaVault: CheddaVault
  let provider: ethers.providers.WebSocketProvider
  let signer: Signer

  beforeEach(() => {
    jest.setTimeout(10000)

    provider = new ethers.providers.WebSocketProvider(webSocketUrl)
    signer = ethers.Wallet.createRandom()
    cheddaVault = new CheddaVault(provider, address, signer)
  })

  afterEach(() => {
    provider.destroy()
    jest.clearAllMocks()
  })

  it('should deposit asset', () => {
    const amount = ethers.utils.parseUnits('1')
    const toAccount = '0x0000000000000000000000000000000000000003'

    cheddaVault.depositAsset(amount, toAccount)
    expect(mockDeposit).toHaveBeenCalledTimes(1)
    expect(mockDeposit).toHaveBeenCalledWith(amount, toAccount)
  })

  it('should approve transactions', async () => {
    const amount = ethers.utils.parseEther('1')
    const spender = '0x364062f04922CccB89bbbE1fd03b735D09A50662'

    await cheddaVault.approve(spender, amount)
    expect(mockApprove).toHaveBeenCalledTimes(1)
    expect(mockApprove).toHaveBeenCalledWith(spender, amount)
  })

  it('should add collateral', () => {
    const amount = ethers.utils.parseUnits('1')
    const token = '0x0000000000000000000000000000000000000003'

    cheddaVault.addCollateral(token, amount)
    expect(mockAddCollateral).toHaveBeenCalledTimes(1)
    expect(mockAddCollateral).toHaveBeenCalledWith(token, amount)
  })
})
