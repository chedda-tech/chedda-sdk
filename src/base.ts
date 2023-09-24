import { ethers } from "ethers";
import { CheddaVault } from "./vault";

export class Chedda {
  provider: ethers.providers.WebSocketProvider;

  constructor(appProvider: string) {
    this.provider = new ethers.providers.WebSocketProvider(appProvider);
  }

  vault() {
    return new CheddaVault(this.provider, "Hello world");
  }
}
