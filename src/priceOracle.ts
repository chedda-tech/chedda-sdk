import { BigNumber, ethers, Contract } from "ethers";

export class PriceOracle {
  oracleContract: Contract | undefined;
  provider: ethers.providers.WebSocketProvider;

  constructor(provider: ethers.providers.WebSocketProvider) {
    this.provider = provider;
    this.oracleContract = undefined;
  }

  async getAssetPrice(
    address: string,
    MultiAssetPriceOracle: { abi: ethers.ContractInterface },
    priceFeedAddress: string
  ): Promise<BigNumber> {
    const priceFeedAbi = MultiAssetPriceOracle.abi;
    this.oracleContract = new ethers.Contract(
      priceFeedAddress,
      priceFeedAbi,
      this.provider
    );
    return await this.oracleContract.readPrice(address, 1);
  }
}
