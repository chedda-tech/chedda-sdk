import { ethers, Contract, Signer } from 'ethers'
import CheddaTokenArtifact from './artifacts/CheddaToken.json'
import { SendParam } from './utils/types'

export class CheddaToken {
  public contract!: Contract

  constructor(
    private provider: ethers.JsonRpcProvider,
    private address: string,
    private signer: Signer,
  ) {
    this.initializeContract()
  }

  async name(): Promise<string> {
    try {
      return await this.contract.name()
    } catch (error) {
      console.error('Error in name:', error)
      throw error
    }
  }

  async symbol(): Promise<string> {
    try {
      return await this.contract.symbol()
    } catch (error) {
      console.error('Error in symbol:', error)
      throw error
    }
  }

  async approve(spender: string, amount: bigint) {
    try {
      return await this.contract.connect(this.signer).getFunction('approve')(spender, amount)
    } catch (error) {
      console.error('Error in approve:', error)
      throw error
    }
  }

  async allowance(account: string, spender: string): Promise<bigint> {
    try {
      if (this.contract.isNFT) {
        return await this.contract.isApprovedForAll(account, spender)
      } else {
        return await this.contract.allowance(account, spender)
      }
    } catch (error) {
      console.error('Error in allowance:', error)
      throw error
    }
  }

  async balanceOf(account: string): Promise<bigint> {
    try {
      return await this.contract.balanceOf(account)
    } catch (error) {
      console.error('Error in balanceOf:', error)
      throw error
    }
  }

  async ownedTokens(account: string): Promise<string[]> {
    try {
      return (await this.contract.ownedTokens(account)).map((t: any) => t.toString())
    } catch (error) {
      console.error('Error in ownedTokens:', error)
      throw error
    }
  }

  async transfer(to: string, amount: bigint) {
    try {
      return await this.contract.connect(this.signer).getFunction('transfer')(to, amount)
    } catch (error) {
      console.error('Error in transfer:', error)
      throw error
    }
  }

  async totalSupply(): Promise<bigint> {
    try {
      return await this.contract.totalSupply()
    } catch (error) {
      console.error('Error in totalSupply:', error)
      throw error
    }
  }

  async quoteSend(sendParam: SendParam, payInLzToken: boolean) {
    try {
      return await this.contract.quoteSend(sendParam, payInLzToken)
    } catch (error) {
      console.error('Error in quoteSend:', error)
      throw error
    }
  }

  async decimals() {
    try {
      return await this.contract.decimals()
    } catch (error) {
      console.error('Error in decimals:', error)
      throw error
    }
  }

  async send(sendParam: SendParam, nativeFee: bigint, refundAddress: string) {
    try {
      return await this.contract.connect(this.signer).getFunction('send')(sendParam, [nativeFee, 0], refundAddress, {
        value: nativeFee,
      })
    } catch (error) {
      console.error('Error in send:', error)
      throw error
    }
  }

  initializeContract() {
    let abi: ethers.InterfaceAbi = CheddaTokenArtifact.abi

    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, abi, this.provider)
  }
}
