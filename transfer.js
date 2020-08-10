var Web3 = require('web3');
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();
const web3 = new Web3(tokens.ProviderUrl);

function transfer(sender, receiver, etherAmount)
{
    console.log('transfer from: ' + sender);
    console.log('transfer to: ' + receiver);
    console.log('ether amount: ' + etherAmount);
    web3.eth.sendTransaction({to:receiver, from:sender, value:web3.utils.toWei(etherAmount, "ether")});
}

argvs = process.argv.slice(2);

transfer(argvs[0], argvs[1], argvs[2]);
