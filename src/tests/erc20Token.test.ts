import { ethers, Signer } from 'ethers'
import { ERC20Token } from '../erc20Token'
import { mockERC20Token } from '../utils/mocks'
import { webSocketUrl, mockAddress } from '../utils/constants'

jest.mock('ethers')

jest.mock('../erc20Token', () => {
  return {
    ERC20Token: jest.fn().mockImplementation(() => {
      return {
        ...mockERC20Token,
      }
    }),
  }
})

describe('Token', () => {
  let token: ERC20Token
  let signer: Signer
  let provider: ethers.providers.WebSocketProvider

  beforeEach(() => {
    jest.setTimeout(10000)
    provider = new ethers.providers.WebSocketProvider(webSocketUrl)
    signer = ethers.Wallet.createRandom()
    token = new ERC20Token(provider, mockAddress, signer)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get the name of the token', async () => {
    mockERC20Token.name.mockResolvedValue('MyToken')
    const name = await token.name()
    expect(name).toEqual('MyToken')
    expect(mockERC20Token.name).toHaveBeenCalledTimes(1)
  })

  it('should get the symbol of the token', async () => {
    mockERC20Token.symbol.mockResolvedValue('MTK')
    const symbol = await token.symbol()
    expect(symbol).toEqual('MTK')
    expect(mockERC20Token.symbol).toHaveBeenCalledTimes(1)
  })

  it('should approve transactions', async () => {
    const spender = '0x364062f04922CccB89bbbE1fd03b735D09A50662'
    const amount = ethers.utils.parseEther('1')
    mockERC20Token.approve.mockResolvedValue(undefined)
    await token.approve(spender, amount)
    expect(mockERC20Token.approve).toHaveBeenCalledTimes(1)
    expect(mockERC20Token.approve).toHaveBeenCalledWith(spender, amount)
  })

  it('should check allowance', async () => {
    const account = '0xAccount'
    const spender = '0x364062f04922CccB89bbbE1fd03b735D09A50662'
    const allowanceValue = ethers.utils.parseEther('0.5')
    mockERC20Token.allowance.mockResolvedValue(allowanceValue)
    const allowance = await token.allowance(account, spender)
    expect(allowance).toEqual(allowanceValue)
    expect(mockERC20Token.allowance).toHaveBeenCalledTimes(1)
    expect(mockERC20Token.allowance).toHaveBeenCalledWith(account, spender)
  })

  it('should get balance of an account', async () => {
    const account = '0xAccount'
    const balanceValue = ethers.utils.parseEther('10')
    mockERC20Token.balanceOf.mockResolvedValue(balanceValue)
    const balance = await token.balanceOf(account)
    expect(balance).toEqual(balanceValue)
    expect(mockERC20Token.balanceOf).toHaveBeenCalledTimes(1)
    expect(mockERC20Token.balanceOf).toHaveBeenCalledWith(account)
  })

  it('should get owned tokens of an account', async () => {
    const account = '0xAccount'
    const ownedTokensValue = ['0xToken1', '0xToken2']
    mockERC20Token.ownedTokens.mockResolvedValue(ownedTokensValue)
    const ownedTokens = await token.ownedTokens(account)
    expect(ownedTokens).toEqual(ownedTokensValue)
    expect(mockERC20Token.ownedTokens).toHaveBeenCalledTimes(1)
    expect(mockERC20Token.ownedTokens).toHaveBeenCalledWith(account)
  })

  it('should transfer tokens', async () => {
    const to = '0xReceiver'
    const amount = ethers.utils.parseEther('2')
    mockERC20Token.transfer.mockResolvedValue(undefined)
    await token.transfer(to, amount)
    expect(mockERC20Token.transfer).toHaveBeenCalledTimes(1)
    expect(mockERC20Token.transfer).toHaveBeenCalledWith(to, amount)
  })

  it('should get the total supply of tokens', async () => {
    const totalSupplyValue = ethers.utils.parseEther('100')
    mockERC20Token.totalSupply.mockResolvedValue(totalSupplyValue)
    const totalSupply = await token.totalSupply()
    expect(totalSupply).toEqual(totalSupplyValue)
    expect(mockERC20Token.totalSupply).toHaveBeenCalledTimes(1)
  })
})
