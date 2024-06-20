import { BigNumber, ethers, Contract, Signer } from 'ethers'
import AccountActorArtifact from './artifacts/AccountActor.json'
import { IAccountSummary, IPosition } from './utils/types'

export class AccountActor {
  public contract!: Contract

  constructor(
    private provider: ethers.providers.JsonRpcProvider,
    private address: string,
    private signer: Signer,
  ) {
    this.initiateContract()
  }

  async accountSummary(account: string): Promise<IAccountSummary> {
    try {
      return await this.contract.accountSummary(account)
    } catch (error) {
      console.error('Error in accountSummary:', error)
      throw error
    }
  }

  async allClaimableRewards(account: string): Promise<BigNumber[]> {
    try {
      return await this.contract.allClaimableRewards(account)
    } catch (error) {
      console.error('Error in allClaimableRewards:', error)
      throw error
    }
  }

  async claimAllRewards(account: string): Promise<BigNumber> {
    try {
      return await this.contract.connect(this.signer).claimAllRewards(account)
    } catch (error) {
      console.error('Error in claimAllRewards:', error)
      throw error
    }
  }

  async allPositions(account: string, showActiveOnly: boolean): Promise<IPosition[]> {
    try {
      return await this.contract.allPositions(account, showActiveOnly)
    } catch (error) {
      console.error('Error in allPositions:', error)
      throw error
    }
  }

  async getPosition(account: string, poolAddress: string): Promise<IPosition> {
    try {
      return await this.contract.getPosition(account, poolAddress)
    } catch (error) {
      console.error('Error in getPosition:', error)
      throw error
    }
  }

  initiateContract() {
    let abi: ethers.ContractInterface = AccountActorArtifact.abi

    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, abi, this.provider)
  }
}
