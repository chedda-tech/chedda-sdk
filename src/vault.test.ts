import { ethers, Signer } from 'ethers'
import { address, webSocketUrl } from './constants'
import { mockCheddaVault } from './utils/mocks'
import { CheddaVault } from './vault'

jest.mock('ethers')

jest.mock('./vault', () => {
  return {
    CheddaVault: jest.fn().mockImplementation(() => {
      return mockCheddaVault as CheddaVault // Cast to CheddaVault
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

  it('should deposit assets', async () => {
    const amount = ethers.utils.parseUnits('1')
    const toAccount = '0x0000000000000000000000000000000000000003'

    await cheddaVault.depositAsset(amount, toAccount)

    expect(mockCheddaVault.depositAsset).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.depositAsset).toHaveBeenCalledWith(amount, toAccount)
  })

  it('should redeem assets', async () => {
    const amount = ethers.utils.parseUnits('1')
    const toAccount = '0x0000000000000000000000000000000000000004'

    await cheddaVault.redeem(amount, toAccount)

    expect(mockCheddaVault.redeem).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.redeem).toHaveBeenCalledWith(amount, toAccount)
  })

  it('should add collateral', async () => {
    const token = '0x0000000000000000000000000000000000000005'
    const amount = ethers.utils.parseUnits('1')

    await cheddaVault.addCollateral(token, amount)

    expect(mockCheddaVault.addCollateral).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.addCollateral).toHaveBeenCalledWith(token, amount)
  })

  it('should remove collateral', async () => {
    const token = '0x0000000000000000000000000000000000000006'
    const amount = ethers.utils.parseUnits('1')

    await cheddaVault.removeCollateral(token, amount)

    expect(mockCheddaVault.removeCollateral).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.removeCollateral).toHaveBeenCalledWith(token, amount)
  })

  it('should fetch account collateral token IDs', async () => {
    const account = '0x0000000000000000000000000000000000000007'
    const token = '0x0000000000000000000000000000000000000008'

    await cheddaVault.accountCollateralTokenIds(account, token)

    expect(mockCheddaVault.accountCollateralTokenIds).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.accountCollateralTokenIds).toHaveBeenCalledWith(account, token)
  })

  it('should borrow assets', async () => {
    const amount = ethers.utils.parseUnits('1')

    await cheddaVault.borrow(amount)

    expect(mockCheddaVault.borrow).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.borrow).toHaveBeenCalledWith(amount)
  })

  it('should repay assets', async () => {
    const amount = ethers.utils.parseUnits('1')

    await cheddaVault.repay(amount)

    expect(mockCheddaVault.repay).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.repay).toHaveBeenCalledWith(amount)
  })

  it('should fetch collateral information', async () => {
    const account = '0x0000000000000000000000000000000000000009'
    const token = '0x0000000000000000000000000000000000000010'

    await cheddaVault.collateral(account, token)

    expect(mockCheddaVault.collateral).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.collateral).toHaveBeenCalledWith(account, token)
  })

  it('should fetch total assets', async () => {
    await cheddaVault.totalAssets()

    expect(mockCheddaVault.totalAssets).toHaveBeenCalledTimes(1)
  })

  it('should fetch collateral amounts', async () => {
    await cheddaVault.collateralAmounts()

    expect(mockCheddaVault.collateralAmounts).toHaveBeenCalledTimes(1)
  })

  it('should fetch utilization', async () => {
    await cheddaVault.utilization()

    expect(mockCheddaVault.utilization).toHaveBeenCalledTimes(1)
  })

  it('should fetch total account collateral value', async () => {
    const account = '0x0000000000000000000000000000000000000011'

    await cheddaVault.totalAccountCollateralValue(account)

    expect(mockCheddaVault.totalAccountCollateralValue).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.totalAccountCollateralValue).toHaveBeenCalledWith(account)
  })

  it('should fetch deposit APR', async () => {
    await cheddaVault.depositApr()

    expect(mockCheddaVault.depositApr).toHaveBeenCalledTimes(1)
  })

  it('should fetch borrow APR', async () => {
    await cheddaVault.borrowApr()

    expect(mockCheddaVault.borrowApr).toHaveBeenCalledTimes(1)
  })

  it('should fetch rewards APR', async () => {
    await cheddaVault.rewardsApr()

    expect(mockCheddaVault.rewardsApr).toHaveBeenCalledTimes(1)
  })

  it('should fetch vault stats', async () => {
    await cheddaVault.getVaultStats()

    expect(mockCheddaVault.getVaultStats).toHaveBeenCalledTimes(1)
  })

  it('should approve transactions', async () => {
    const spender = '0x364062f04922CccB89bbbE1fd03b735D09A50662'
    const amount = ethers.utils.parseEther('1')

    await cheddaVault.approve(spender, amount)

    expect(mockCheddaVault.approve).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.approve).toHaveBeenCalledWith(spender, amount)
  })

  it('should fetch allowance', async () => {
    const account = '0x0000000000000000000000000000000000000012'
    const spender = '0x0000000000000000000000000000000000000013'

    await cheddaVault.allowance(account, spender)

    expect(mockCheddaVault.allowance).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.allowance).toHaveBeenCalledWith(account, spender)
  })

  it('should fetch balance of', async () => {
    const account = '0x0000000000000000000000000000000000000014'

    await cheddaVault.balanceOf(account)

    expect(mockCheddaVault.balanceOf).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.balanceOf).toHaveBeenCalledWith(account)
  })

  it('should transfer assets', async () => {
    const to = '0x0000000000000000000000000000000000000015'
    const amount = ethers.utils.parseUnits('1')

    await cheddaVault.transfer(to, amount)

    expect(mockCheddaVault.transfer).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.transfer).toHaveBeenCalledWith(to, amount)
  })

  it('should fetch total supply', async () => {
    await cheddaVault.totalSupply()

    expect(mockCheddaVault.totalSupply).toHaveBeenCalledTimes(1)
  })

  it('should fetch gauge', async () => {
    await cheddaVault.gauge()

    expect(mockCheddaVault.gauge).toHaveBeenCalledTimes(1)
  })

  it('should fetch account pending amount', async () => {
    const account = '0x0000000000000000000000000000000000000016'

    await cheddaVault.accountPendingAmount(account)

    expect(mockCheddaVault.accountPendingAmount).toHaveBeenCalledTimes(1)
    expect(mockCheddaVault.accountPendingAmount).toHaveBeenCalledWith(account)
  })

  it('should initiate contract', () => {
    cheddaVault.initiateContract()

    expect(mockCheddaVault.initiateContract).toHaveBeenCalledTimes(1)
  })
})
