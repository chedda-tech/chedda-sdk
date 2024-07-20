import { ethers, JsonRpcSigner } from 'ethers'
import { CheddaLockingGauge } from '../cheddaLockingGauge'
import { mockAddress } from '../utils/constants'
import { mockCheddaLockingGauge, mockPoolLens } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../cheddaLockingGauge', () => {
  return {
    CheddaLockingGauge: jest.fn().mockImplementation(() => {
      return {
        ...mockCheddaLockingGauge,
      }
    }),
  }
})

describe('CheddaLockGauge', () => {
  let cheddaLockGauge: CheddaLockingGauge
  let mockProvider: ethers.JsonRpcProvider
  let mockSigner: JsonRpcSigner

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider('webSocketUrl')
    mockSigner = new ethers.JsonRpcSigner(mockProvider, '0x00')
    cheddaLockGauge = new CheddaLockingGauge(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(mockPoolLens.contract).not.toBeNull()
  })

  it('should add to lock', async () => {
    const amount = BigInt(100)
    await cheddaLockGauge.addToLock(amount)
    expect(mockCheddaLockingGauge.addToLock).toHaveBeenCalled()
  })

  it('should extend lock', async () => {
    await cheddaLockGauge.extendLock(1)
    expect(mockCheddaLockingGauge.extendLock).toHaveBeenCalled()
  })

  it('should create lock', async () => {
    const amount = BigInt(100)
    await cheddaLockGauge.createLock(amount, 1)
    expect(mockCheddaLockingGauge.createLock).toHaveBeenCalled()
  })

  it('should withdraw chedda', async () => {
    await cheddaLockGauge.withdraw()
    expect(mockCheddaLockingGauge.withdraw).toHaveBeenCalled()
  })

  it('should claim rewards', async () => {
    await cheddaLockGauge.claim()
    expect(mockCheddaLockingGauge.claim).toHaveBeenCalledWith()
  })

  it('should get claimable rewards', async () => {
    const poolAddress = mockAddress

    await cheddaLockGauge.claimable(poolAddress)
    expect(mockCheddaLockingGauge.claimable).toHaveBeenCalledWith(poolAddress)
  })

  it('should get locked chedda', async () => {
    const poolAddress = mockAddress

    await cheddaLockGauge.getLock(poolAddress)
    expect(mockCheddaLockingGauge.getLock).toHaveBeenCalledWith(poolAddress)
  })

  it('should add rewards', async () => {
    const amount = BigInt(100)

    await cheddaLockGauge.addRewards(amount)
    expect(mockCheddaLockingGauge.addRewards).toHaveBeenCalledWith(amount)
  })

  it('should get rewardPerShare', async () => {
    await cheddaLockGauge.rewardPerShare()
    expect(mockCheddaLockingGauge.rewardPerShare).toHaveBeenCalledWith()
  })

  it('should get totalWeight', async () => {
    await cheddaLockGauge.totalWeight()
    expect(mockCheddaLockingGauge.totalWeight).toHaveBeenCalledWith()
  })

  it('should get totalLocked', async () => {
    await cheddaLockGauge.totalLocked()
    expect(mockCheddaLockingGauge.totalLocked).toHaveBeenCalledWith()
  })

  it('should get token', async () => {
    await cheddaLockGauge.token()
    expect(mockCheddaLockingGauge.token).toHaveBeenCalledWith()
  })

  it('should get totalRewards', async () => {
    await cheddaLockGauge.totalClaimed()
    expect(mockCheddaLockingGauge.totalClaimed).toHaveBeenCalledWith()
  })

  it('should add weight', async () => {
    await cheddaLockGauge.weight()
    expect(mockCheddaLockingGauge.weight).toHaveBeenCalledWith()
  })

  it('should get numberOfLocks', async () => {
    await cheddaLockGauge.numberOfLocks()
    expect(mockCheddaLockingGauge.numberOfLocks).toHaveBeenCalledWith()
  })
})
