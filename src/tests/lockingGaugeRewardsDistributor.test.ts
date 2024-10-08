import { ethers, JsonRpcSigner } from 'ethers'
import { LockingGaugeRewardsDistributor } from '../lockingGaugeRewardsDistributor'
import { mockAddress } from '../utils/constants'
import { mockLockingGaugeRewardsDistributor, mockPoolLens } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../lockingGaugeRewardsDistributor', () => {
  return {
    LockingGaugeRewardsDistributor: jest.fn().mockImplementation(() => {
      return {
        ...mockLockingGaugeRewardsDistributor,
      }
    }),
  }
})

describe('CheddaLockGauge', () => {
  let lockingGaugeRewardsDistributor: LockingGaugeRewardsDistributor
  let mockProvider: ethers.JsonRpcProvider
  let mockSigner: JsonRpcSigner

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider('webSocketUrl')
    mockSigner = new ethers.JsonRpcSigner(mockProvider, '0x00')
    lockingGaugeRewardsDistributor = new LockingGaugeRewardsDistributor(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(mockPoolLens.contract).not.toBeNull()
  })

  it('should registerPool pool', async () => {
    const poolAddress = mockAddress

    await lockingGaugeRewardsDistributor.registerPool(poolAddress)
    expect(mockLockingGaugeRewardsDistributor.registerPool).toHaveBeenCalled()
  })

  it('should unregisterPool pool', async () => {
    const poolAddress = mockAddress
    await lockingGaugeRewardsDistributor.unregisterPool(poolAddress)
    expect(mockLockingGaugeRewardsDistributor.unregisterPool).toHaveBeenCalled()
  })

  it('should get distribute', async () => {
    await lockingGaugeRewardsDistributor.distribute()
    expect(mockLockingGaugeRewardsDistributor.distribute).toHaveBeenCalledWith()
  })

  it('should get weightTotal', async () => {
    await lockingGaugeRewardsDistributor.totalWeightSum()
    expect(mockLockingGaugeRewardsDistributor.totalWeightSum).toHaveBeenCalled()
  })

  it('should get token', async () => {
    await lockingGaugeRewardsDistributor.token()
    expect(mockLockingGaugeRewardsDistributor.token).toHaveBeenCalledWith()
  })

  it('should get pools', async () => {
    await lockingGaugeRewardsDistributor.pools()
    expect(mockLockingGaugeRewardsDistributor.pools).toHaveBeenCalled()
  })

  it('should get Konstant', async () => {
    await lockingGaugeRewardsDistributor.Konstant()
    expect(mockLockingGaugeRewardsDistributor.Konstant).toHaveBeenCalled()
  })

  it('should get lockingPortion', async () => {
    await lockingGaugeRewardsDistributor.lockingPortion()
    expect(mockLockingGaugeRewardsDistributor.lockingPortion).toHaveBeenCalled()
  })

  it('should get stakingPortion', async () => {
    await lockingGaugeRewardsDistributor.stakingPortion()
    expect(mockLockingGaugeRewardsDistributor.stakingPortion).toHaveBeenCalled()
  })
})
