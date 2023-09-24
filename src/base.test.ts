import { Chedda } from './base'

const provider = 'https://arb-goerli.g.alchemy.com/v2/MjKCCMegGWN3PDm1Kt2vCAXhoKQd0XxR'

describe('Chedda', () => {
  let chedda: any

  // Set up Chedda instance before the tests
  beforeAll(() => {
    chedda = new Chedda(provider)
  })

  // Close the provider connection after all tests are completed
  afterAll(async () => {
    await chedda.closeProvider()
  })

  it('should create a Chedda instance', () => {
    expect(chedda).toBeInstanceOf(Chedda)
    expect(chedda.provider).toBeDefined()
  })

  it('should create a CheddaVault instance', () => {
    const vault = chedda.vault()
    expect(vault).toBeDefined()
  })
})
