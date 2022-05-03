import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
// Replace with the wallet address you want to query:
const ownerAddr = "0x00000000219ab540356cbb839cbe05303d7705fa";

/* 
Replace with the token contract address you want to query:
the below address Corresponds to the token Tether (USDT)
*/
const tokenAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

/*
** Fetching the token Balance with Alchemy's getTokenBalances API
*/
var dataParams = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "params": [
    `${ownerAddr}`,
    [
      `${tokenAddr}`
    ]
  ],
  "id": 42
});

var dataConfig = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : dataParams
};

var data;

await axios(dataConfig)
.then(function (response) {
  //This line converts the tokenBalance values from hex to decimal
  response.data["result"]["tokenBalances"][0]["tokenBalance"] = parseInt(response.data["result"]["tokenBalances"][0]["tokenBalance"], 16);
  data = response.data.result;
  console.log("Response Object for getTokenBalances\n", data)
  return true;
})
.catch(function (error) {
  console.log(error);
});