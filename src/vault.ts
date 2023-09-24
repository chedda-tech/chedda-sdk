import { BigNumber, ethers } from "ethers";

export class CheddaVault {
  provider: any;
  signer: string;

  constructor(provider: any, signer: string) {
    this.provider = provider;
    this.signer = signer;
  }

  async depositAsset(contract: any, amount: BigNumber, toAccount: string) {
    return await contract.connect(this.signer).deposit(amount, toAccount);
  }

  async redeem(contract: any, amount: BigNumber, toAccount: string) {
    return await contract
      .connect(this.signer)
      .redeem(amount, toAccount, toAccount);
  }

  async addCollateral(contract: any, token: string, amount: BigNumber) {
    return await contract.connect(this.signer).addCollateral(token, amount);
  }

  async removeCollateral(contract: any, token: string, amount: BigNumber) {
    return await contract.connect(this.signer).removeCollateral(token, amount);
  }

  async addCollateral721(contract: any, token: string, tokenIds: string[]) {
    return await contract
      .connect(this.signer)
      .addCollateral721(token, tokenIds);
  }

  async removeCollateral721(contract: any, token: string, tokenIds: string[]) {
    return await contract
      .connect(this.signer)
      .removeCollateral721(token, tokenIds);
  }

  async accountCollateralTokenIds(
    contract: any,
    account: string,
    token: string
  ) {
    return await contract.accountCollateralTokenIds(account, token);
  }

  async borrow(contract: any, amount: BigNumber) {
    return await contract.connect(this.signer).take(amount);
  }

  async repay(contract: any, amount: BigNumber) {
    return await contract.connect(this.signer).putAmount(amount);
  }

  async collateral(
    contract: any,
    account: string,
    token: string
  ): Promise<any> {
    return await contract.accountCollateral(account, token);
  }

  async totalAssets(contract: any): Promise<BigNumber> {
    return await contract.totalAssets();
  }

  async collateralAmounts(contract: any) {
    return await contract.collateralAmounts();
  }

  async utilization(contract: any): Promise<BigNumber> {
    return await contract.utilization();
  }

  async totalAccountCollateralValue(
    contract: any,
    account: string
  ): Promise<BigNumber> {
    return await contract.totalAccountCollateralValue(account);
  }

  async depositApr(contract: any): Promise<BigNumber> {
    return await contract.depositApr();
  }

  async borrowApr(contract: any): Promise<BigNumber> {
    return await contract.borrowApr();
  }

  async rewardsApr(contract: any): Promise<BigNumber> {
    return await contract.rewardsApr();
  }

  async getVaultStats(contract: any) {
    return await contract.getVaultStats();
  }

  // ERC20
  async approve(contract: any, spender: string, amount: BigNumber) {
    await contract.connect(this.signer).approve(spender, amount);
  }

  async allowance(
    contract: any,
    account: string,
    spender: string
  ): Promise<BigNumber> {
    return await contract.allowance(account, spender);
  }

  async balanceOf(contract: any, account: string): Promise<BigNumber> {
    return await contract.balanceOf(account);
  }

  async transfer(contract: any, to: string, amount: BigNumber) {
    await contract.connect(this.signer).transfer(to, amount);
  }

  async totalSupply(contract: any): Promise<BigNumber> {
    return await contract.totalSupply();
  }

  async gauge(contract: any): Promise<string> {
    return await contract.gauge();
  }

  async accountPendingAmount(
    contract: any,
    account: string
  ): Promise<BigNumber> {
    return await contract.accountPendingAmount(account);
  }

  contractAt(address: string, artifact: any) {
    return new ethers.Contract(address, artifact, this.provider);
  }
}
