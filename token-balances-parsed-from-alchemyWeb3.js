// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "<-- ALCHEMY APP API KEY -->",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

//Feel free to switch this wallet address with another address
const ownerAddress = "0x00000000219ab540356cbb839cbe05303d7705fa";

//The below token contract address corresponds to USDT
const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

const data = await alchemy.core.getTokenBalances(
  ownerAddress,
  tokenContractAddresses
);
console.log("Response Object for getTokenBalances\n", data)

/*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
const metadata = await web3.alchemy.getTokenMetadata( tokenContractAddresses[0]);

//Forming the name of the token that comprises of the Name and the Symbol of the token
const tokenName = metadata.name + "(" + metadata.symbol + ")";

/* Calculating the tokenBalance in decimal. The "decimals" field in the token metadata on line 21 tells us 
how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
*/
const tokenBalance = data["tokenBalances"][0]["tokenBalance"]/Math.pow(10, metadata.decimals)
console.log("Token balance for", tokenName, "is", tokenBalance);
