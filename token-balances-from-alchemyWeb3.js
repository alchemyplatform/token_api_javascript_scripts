import { createAlchemyWeb3 } from "@alch/alchemy-web3";
 
//Replace with your Alchemy API Key:
const apiKey = "demo";
 
// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
   `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
 );
 
// Replace with the wallet address you want to query:
const ownerAddress = "0x00000000219ab540356cbb839cbe05303d7705fa";
/* 
Replace with the token contract address you want to query:
The below address Corresponds to USDT
*/
const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

/*
** Fetching the token Balance with Alchemy's getTokenBalances API
*/
const data = await web3.alchemy.getTokenBalances( ownerAddress, tokenContractAddresses);
console.log("Response Object for getTokenBalances\n", data)

/*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
const metadata = await web3.alchemy.getTokenMetadata( tokenContractAddresses[0]);

//Forming the name of the token that comprises of the Name and the Symbol of the token
const tokenName = metadata.name + "(" + metadata.symbol + ")";

/* Calculating the tokenBalance in USD. The "decimals" field in the token metadata on line 21 tells us 
how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
*/
const tokenBalance = "$"+ data["tokenBalances"][0]["tokenBalance"]/Math.pow(10, metadata.decimals)
console.log("Token balance for", tokenName, "is", tokenBalance);
