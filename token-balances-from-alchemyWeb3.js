// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "ZET_UeTzCYNhflpFmQ0jNkxWs1E6DkZ0",
  network: Network.https://solana-mainnet.g.alchemy.com/v2/ZET_UeTzCYNhflpFmQ0jNkxWs1E6DkZ0,
};
const alchemy = new Alchemy(config);

//Feel free to switch this wallet address with another address
const ownerAddress = "4smQrzkhSkfrHYtFDH2xLQbaZLEMvfdsqoijDQj1vkUY";

//The below token contract address corresponds to USDT
const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

const data = await alchemy.core.getTokenBalances(
  ownerAddress,
  tokenContractAddresses
);

console.log("Token balance for Address");
console.log(data);
