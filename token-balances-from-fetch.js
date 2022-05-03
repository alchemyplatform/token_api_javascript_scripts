import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";

const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the wallet address you want to query:
const ownerAddr = "0x00000000219ab540356cbb839cbe05303d7705fa";

// Replace with the token contract address you want to query:
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

// Make the request and print the formatted response:
fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => {
    //This line converts the tokenBalance values from hex to decimal
    response["result"]["tokenBalances"][0]["tokenBalance"] = parseInt(response["result"]["tokenBalances"][0]["tokenBalance"], 16);
    console.log("Token balance for address\n", JSON.stringify(response.result, null, 2))
  })
  .catch(error => console.log('error', error));
