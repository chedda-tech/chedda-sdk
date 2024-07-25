import { ethers, JsonRpcSigner } from 'ethers'
import { StakingPool } from '../stakingPool'
import { mockAddress } from '../utils/constants'
import { mockPoolLens, mockStakingPool } from '../utils/mocks'

jest.mock('ethers')

jest.mock('../stakingPool', () => {
  return {
    StakingPool: jest.fn().mockImplementation(() => {
      return {
        ...mockStakingPool,
      }
    }),
  }
})

describe('StakingPool', () => {
  let stakingPool: StakingPool
  let mockProvider: ethers.JsonRpcProvider
  let mockSigner: JsonRpcSigner

  beforeEach(() => {
    mockProvider = new ethers.JsonRpcProvider('webSocketUrl')
    mockSigner = new ethers.JsonRpcSigner(mockProvider, '0x00')
    stakingPool = new StakingPool(mockProvider, mockAddress, mockSigner)
  })

  it('should initiate the contract', () => {
    expect(mockPoolLens.contract).not.toBeNull()
  })

  it('should stake asset', async () => {
    const amount = BigInt(100)
    await stakingPool.stake(amount)
    expect(mockStakingPool.stake).toHaveBeenCalled()
  })

  it('should unstake asset', async () => {
    const amount = BigInt(100)
    await stakingPool.unStake(amount)
    expect(mockStakingPool.unStake).toHaveBeenCalled()
  })

  it('should claim rewards', async () => {
    await stakingPool.claim()
    expect(mockStakingPool.claim).toHaveBeenCalledWith()
  })

  it('should get claimable rewards', async () => {
    const poolAddress = mockAddress

    await stakingPool.claimable(poolAddress)
    expect(mockStakingPool.claimable).toHaveBeenCalledWith(poolAddress)
  })

  it('should get staking balance', async () => {
    const poolAddress = mockAddress

    await stakingPool.stakingBalance(poolAddress)
    expect(mockStakingPool.stakingBalance).toHaveBeenCalledWith(poolAddress)
  })

  it('should add rewards', async () => {
    const amount = BigInt(100)

    await stakingPool.addRewards(amount)
    expect(mockStakingPool.addRewards).toHaveBeenCalledWith(amount)
  })
})
