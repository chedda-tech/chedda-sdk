import { ethers, Contract, Signer } from 'ethers'
import MarketNFT from './artifacts/MarketNFT.json'

export class ERC721Token {
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
      if (this.contract.isNFT) {
        await this.contract.connect(this.signer).getFunction('setApprovalForAll')(spender, amount)
      } else {
        await this.contract.connect(this.signer).getFunction('approve')(spender, amount)
      }
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

  async transfer(to: string, amount: bigint) {
    try {
      await this.contract.connect(this.signer).getFunction('transfer')(to, amount)
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

  contractAt(address: string) {
    let abi: ethers.InterfaceAbi = MarketNFT.abi

    const tokenContract = new ethers.Contract(address, abi, this.provider)
    this.contract = tokenContract
  }

  initializeContract() {
    let abi: ethers.InterfaceAbi = MarketNFT.abi

    if (!this.address || !this.provider) {
      throw new Error('Missing required data for contract initiation.')
    }

    this.contract = new ethers.Contract(this.address, abi, this.provider)
  }
}
