const Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
const BigNumber = require('bignumber.js');
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();
const web3 = new Web3(tokens.ProviderUrl);
const swapperABI = require('./abis/DyDxFlashLoaner.json');
const swapperContract = new web3.eth.Contract(swapperABI.abi, tokens.SwapperAddress);


function deposit(amountEther) 
{
    contractFunction = swapperContract.methods.withdraw(10);
    functionAbi = contractFunction.encodeABI();
    amountWei = Number(web3.utils.toWei(amountEther, "ether"));
        let estimatedGas;
        let nonce;
        console.log("Getting gas estimate");
        Promise.all([web3.eth.getGasPrice()])
                .then((response) => {
        estimatedPrice = Number(response[0]).toString(16);
        console.log("Estimated gas price: " + estimatedPrice);
            
        web3.eth.getTransactionCount(tokens.MyAddress).then(_nonce => {
            nonce = (_nonce).toString(16);
            console.log("Nonce: " + nonce);
            const txParams = {
                gasPrice: '0x' + estimatedPrice,
                gasLimit: 100000,
                to: tokens.SwapperAddress,
                from: tokens.MyAddress,
                nonce: '0x' + nonce,
                value: amountWei
            };
                
            const tx = new Tx(txParams);
            tx.sign(tokens.PrivateKey);
            const serializedTx = tx.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), 
                function(err, result) {
                    if (err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log(result);
                    }
                }
            ).on('receipt', receipt => {
                    console.log(receipt);
            });
        });
    });
}

argvs = process.argv.slice(2);
deposit(argvs[0]);