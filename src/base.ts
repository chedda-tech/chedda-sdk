import { ethers, Signer } from 'ethers'
import { ERC20Token } from './erc20Token'
import { LendingPool } from './lendingPool'
import { PriceOracle } from './priceOracle'
import { PoolLens } from './poolLens'
import { InterestRatesProjector } from './interestRatesProjector'

export class Chedda {
  provider: ethers.providers.WebSocketProvider
  KEEP_ALIVE_CHECK_INTERVAL = 1000
  keepAliveInterval: any
  pingTimeout: any

  constructor(private providerUrl: string) {
    this.provider = new ethers.providers.WebSocketProvider(providerUrl)
    this.listenToEvents()
  }

  lendingPool(address: string, signer: Signer) {
    return new LendingPool(this.provider, address, signer)
  }

  erc20token(address: string, signer: Signer) {
    return new ERC20Token(this.provider, address, signer)
  }

  poolLens(address: string, signer: Signer) {
    return new PoolLens(this.provider, address, signer)
  }

  interestRateProjector(address: string, signer: Signer) {
    return new InterestRatesProjector(this.provider, address, signer)
  }

  priceOracle(address: string) {
    return new PriceOracle(this.provider, address)
  }

  listenToEvents() {
    if (this.provider._websocket && typeof WebSocket !== 'undefined') {
      this.provider._websocket.addEventListener('open', () => this.onWsOpen())
      this.provider._websocket.addEventListener('close', () => this.onWsClose())
    } else {
      console.warn('WebSocket not available. Events will not be listened to.')
    }
  }

  onWsOpen() {
    console.log('Connected to the WS!')
    this.keepAliveInterval = setInterval(() => {
      if (
        this.provider._websocket &&
        (this.provider._websocket.readyState === WebSocket.OPEN ||
          this.provider._websocket.readyState === WebSocket.CONNECTING)
      )
        return

      this.provider._websocket?.close()
    }, this.KEEP_ALIVE_CHECK_INTERVAL)
  }

  onWsClose() {
    console.log('WS connection lost! Reconnecting...')
    clearInterval(this.keepAliveInterval)
    this.load()
  }

  load() {
    // Reload the WebSocketProvider
    this.provider = new ethers.providers.WebSocketProvider(this.providerUrl)

    // Re-set up event handlers for WebSocket events
    this.provider._websocket.addEventListener('open', () => this.onWsOpen())
    this.provider._websocket.addEventListener('close', () => this.onWsClose())
  }

  closeProvider() {
    this.provider.destroy()
  }
}
