interface PoolAsset {
  name: string;
  symbol: string;
  address: string;
  logo: string;
}

interface PoolCollateral {
  name: string;
  symbol: string;
  address: string;
  logo: string;
  isNFT?: boolean;
}

interface Pool {
  name: string;
  address: string;
  asset: PoolAsset;
  collateral: PoolCollateral[];
  stats?: any; // You can specify the type for stats if needed
}

interface Faucet {
  name: string;
  logo: string;
  url: string;
}

interface NetworkParams {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    image: string;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

interface ContractConfig {
  contracts: Record<string, string>;
  networkParams: NetworkParams;
  pools: Pool[];
  faucets: Faucet[];
  ui: {
    chainName: string;
    logo: string;
    txUrlPrefix: string;
  };
}

export interface AppConfig {
  production: boolean;
  environmentName: string;
  identifier: string;
  jsonRpcUrl: string;
  webSocketUrl: string;
  config: ContractConfig;
}
