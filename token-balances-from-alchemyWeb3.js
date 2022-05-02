import { createAlchemyWeb3 } from "@alch/alchemy-web3";
 
//Replace with your API Key
const apiKey = "demo";
 
// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
   `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
 );
 
//Feel free to switch this wallet address with another address
const ownerAddress = "0x00000000219ab540356cbb839cbe05303d7705fa";

//The below token contract address corresponds to USDT
const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

const data = await web3.alchemy.getTokenBalances( ownerAddress, tokenContractAddresses);
 
console.log("Token balance for Address");
console.log(data);
