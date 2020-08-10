var Web3 = require('web3');
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();
const web3 = new Web3(tokens.ProviderUrl);

function getBalance(walletAddress)
{
    web3.eth.getBalance(walletAddress).then(console.log);
}

argvs = process.argv.slice(2);
getBalance(argvs[0]);
