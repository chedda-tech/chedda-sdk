import { ethers, Signer } from 'ethers'
import { Chedda } from './base'
import { address, webSocketUrl } from './constants'

// Mock WebSocketProvider class
jest.mock('ethers')

// Mock CheddaVault class
jest.mock('./vault')

// Mock TokenService class
jest.mock('./token')

// Mock PriceOracle class
jest.mock('./priceOracle')

describe('Chedda', () => {
  let chedda: Chedda
  let signer: Signer

  // Set up Chedda instance before the tests
  beforeAll(() => {
    chedda = new Chedda(webSocketUrl)
    signer = ethers.Wallet.createRandom()
  })

  // Close the provider connection after all tests are completed
  afterAll(async () => {
    chedda.closeProvider()
  })

  it('should create a Chedda instance', () => {
    expect(chedda).toBeInstanceOf(Chedda)
    expect(chedda.provider).toBeDefined()
  })

  it('should create a CheddaVault instance', () => {
    const vault = chedda.vault(address, signer)
    expect(vault).toBeDefined()
  })

  it('should create a Token instance', () => {
    const vault = chedda.token(address, signer)
    expect(vault).toBeDefined()
  })

  it('should create a PriceOracle instance', () => {
    const vault = chedda.priceOracle()
    expect(vault).toBeDefined()
  })
})
