var Web3 = require('web3');
const TokenValues = require('./tokenVals.js');
const erc20ABI = require('./abis/erc20.json');
const tokens = new TokenValues();
const web3 = new Web3(tokens.ProviderUrl);

function getBalance(token, contractAddress)
{
    tokenInstance = new web3.eth.Contract(erc20ABI, tokens.Addrs[token]);
    tokenInstance.methods.balanceOf(contractAddress).call().then(console.log);
}

argvs = process.argv.slice(2);
getBalance(argvs[0], argvs[1]);
