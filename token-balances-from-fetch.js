import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";
const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the wallet address you want to query:
const ownerAddr = "0x00000000219ab540356cbb839cbe05303d7705fa";
/* 
Replace with the token contract address you want to query:
The below address Corresponds to USDT
*/
const tokenAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${ownerAddr}`,
    [
      `${tokenAddr}`,
    ]
  ],
  "id": 42
});

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

var data, metadata;

/*
** Fetching the token Balance with Alchemy's getTokenBalances API
*/
await fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => {
    //This line converts the tokenBalance values from hex to decimal
    response["result"]["tokenBalances"][0]["tokenBalance"] = parseInt(response["result"]["tokenBalances"][0]["tokenBalance"], 16);
    data = response.result;
    console.log("Response Object for getTokenBalances\n", data)
  })
  .catch(error => console.log('error', error));

var metadataRaw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
      `${tokenAddr}`
  ],
  "id": 42
});

var metadataRequestOptions = {
  method: 'POST',
  body: metadataRaw,
  redirect: 'follow'
};

/*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
fetch(fetchURL, metadataRequestOptions)
  .then(response => response.json())
  .then(response => {
    metadata = response.result;

    //Forming the name of the token that comprises of the Name and the Symbol of the token
    const tokenName = metadata.name + "(" + metadata.symbol + ")";

    /* Calculating the tokenBalance in USD. The "decimals" field in the token metadata on line 21 tells us 
    how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
    so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
    */
    const tokenBalance = "$"+ data["tokenBalances"][0]["tokenBalance"]/Math.pow(10, metadata.decimals)
    console.log("Token balance for", tokenName, "is", tokenBalance);
  })
  .catch(error => console.log('error', error));