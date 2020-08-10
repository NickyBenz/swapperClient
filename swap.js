const dydx = require("@studydefi/money-legos/dydx");
const Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
const BigNumber = require('bignumber.js');
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();

const swapperABI = require('./abis/DyDxFlashLoaner.json');
const web3 = new Web3(tokens.ProviderUrl);
const swapperContract = new web3.eth.Contract(swapperABI.abi, tokens.SwapperAddress);

const swap= async function(token, initialAmount, 
                     sequences, returnAmounts,
                     distributions, parts, maxGasInWei) 
{

    let promise = new Promise((resolve, reject) => {
        contractFunction = swapperContract.methods.initateFlashLoan(dydx.soloMargin.address, 
                                                                    token, 
                                                                    initialAmount,
                                                                    sequences, returnAmounts,
                                                                    distributions, parts);

                
        functionAbi = contractFunction.encodeABI();
        console.log("Getting gas estimate");
        Promise.all([web3.eth.getGasPrice()])
                    .then((response) => 
        {
            var estimatedPrice = BigNumber(response[0]);
            var estimatedGas = maxGasInWei / estimatedPrice;
            estimatedGas = BigNumber(estimatedGas).decimalPlaces(0).toString(16);
            estimatedPrice = estimatedPrice.toString(16);
            console.log("Estimated gas price: " + estimatedPrice);
            console.log("Estiamted gas: " + estimatedGas);

            web3.eth.getTransactionCount(tokens.MyAddress).then(_nonce => {
                var nonce = (_nonce).toString(16);
                console.log("Nonce: " + nonce);
                const txParams = {
                    gas: '0x' + estimatedGas,
                    gasPrice: '0x' + estimatedPrice,
                    to: tokens.SwapperAddress,
                    data: functionAbi,
                    from: tokens.MyAddress,
                    nonce: '0x' + nonce,
                    value: 0
                };
                
                const tx = new Tx(txParams);
                tx.sign(tokens.PrivateKey);
                const serializedTx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), 
                    function(err, result) {
                        if (err)
                        {
                            console.log(err);
                            reject(err);
                        }
                        else
                        {
                            console.log(result);
                            resolve(result);
                        }
                    }
                ).on('receipt', receipt => {
                    console.log(receipt);
                });
            });
        });
    });

    await promise;
}


module.exports = {swap};