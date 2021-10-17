let Web3 = require('web3');
let fs = require('fs');

let web3 = new Web3("https://bsc-dataseed.binance.org");
let loadContract = async function(address) {
    var abi = [
          {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "name": "",
                "type": "uint8"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "_owner",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "name": "balance",
                "type": "uint256"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "type": "function"
          }
        ];
    let contract = await new web3.eth.Contract(abi, address)
    return contract.methods;
};
module.exports.web3 = web3;
module.exports.token = loadContract;