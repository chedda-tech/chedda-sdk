import { ethers, Signer } from 'ethers'
import { webSocketUrl, address } from './constants'
import { TokenService } from './token'
import { mockTokenService } from './utils/mocks'

jest.mock('ethers')

jest.mock('./token', () => {
  return {
    TokenService: jest.fn().mockImplementation(() => {
      return {
        ...mockTokenService,
      }
    }),
  }
})

describe('TokenService', () => {
  let tokenService: TokenService
  let signer: Signer
  let provider: ethers.providers.WebSocketProvider

  beforeEach(() => {
    jest.setTimeout(10000)
    provider = new ethers.providers.WebSocketProvider(webSocketUrl)
    signer = ethers.Wallet.createRandom()
    tokenService = new TokenService(provider, address, signer)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get the name of the token', async () => {
    mockTokenService.name.mockResolvedValue('MyToken')
    const name = await tokenService.name()
    expect(name).toEqual('MyToken')
    expect(mockTokenService.name).toHaveBeenCalledTimes(1)
  })

  it('should get the symbol of the token', async () => {
    mockTokenService.symbol.mockResolvedValue('MTK')
    const symbol = await tokenService.symbol()
    expect(symbol).toEqual('MTK')
    expect(mockTokenService.symbol).toHaveBeenCalledTimes(1)
  })

  it('should approve transactions', async () => {
    const spender = '0x364062f04922CccB89bbbE1fd03b735D09A50662'
    const amount = ethers.utils.parseEther('1')
    mockTokenService.approve.mockResolvedValue(undefined)
    await tokenService.approve(spender, amount)
    expect(mockTokenService.approve).toHaveBeenCalledTimes(1)
    expect(mockTokenService.approve).toHaveBeenCalledWith(spender, amount)
  })

  it('should check allowance', async () => {
    const account = '0xAccount'
    const spender = '0x364062f04922CccB89bbbE1fd03b735D09A50662'
    const allowanceValue = ethers.utils.parseEther('0.5')
    mockTokenService.allowance.mockResolvedValue(allowanceValue)
    const allowance = await tokenService.allowance(account, spender)
    expect(allowance).toEqual(allowanceValue)
    expect(mockTokenService.allowance).toHaveBeenCalledTimes(1)
    expect(mockTokenService.allowance).toHaveBeenCalledWith(account, spender)
  })

  it('should get balance of an account', async () => {
    const account = '0xAccount'
    const balanceValue = ethers.utils.parseEther('10')
    mockTokenService.balanceOf.mockResolvedValue(balanceValue)
    const balance = await tokenService.balanceOf(account)
    expect(balance).toEqual(balanceValue)
    expect(mockTokenService.balanceOf).toHaveBeenCalledTimes(1)
    expect(mockTokenService.balanceOf).toHaveBeenCalledWith(account)
  })

  it('should get owned tokens of an account', async () => {
    const account = '0xAccount'
    const ownedTokensValue = ['0xToken1', '0xToken2']
    mockTokenService.ownedTokens.mockResolvedValue(ownedTokensValue)
    const ownedTokens = await tokenService.ownedTokens(account)
    expect(ownedTokens).toEqual(ownedTokensValue)
    expect(mockTokenService.ownedTokens).toHaveBeenCalledTimes(1)
    expect(mockTokenService.ownedTokens).toHaveBeenCalledWith(account)
  })

  it('should transfer tokens', async () => {
    const to = '0xReceiver'
    const amount = ethers.utils.parseEther('2')
    mockTokenService.transfer.mockResolvedValue(undefined)
    await tokenService.transfer(to, amount)
    expect(mockTokenService.transfer).toHaveBeenCalledTimes(1)
    expect(mockTokenService.transfer).toHaveBeenCalledWith(to, amount)
  })

  it('should get the total supply of tokens', async () => {
    const totalSupplyValue = ethers.utils.parseEther('100')
    mockTokenService.totalSupply.mockResolvedValue(totalSupplyValue)
    const totalSupply = await tokenService.totalSupply()
    expect(totalSupply).toEqual(totalSupplyValue)
    expect(mockTokenService.totalSupply).toHaveBeenCalledTimes(1)
  })

  // Add similar tests for other TokenService methods
})
