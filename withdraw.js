const Tx = require('ethereumjs-tx').Transaction;
var Web3 = require('web3');
const BigNumber = require('bignumber.js');
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();
const swapperABI = require('./abis/DyDxFlashLoaner.json');
const web3 = new Web3(tokens.ProviderUrl);
web3.eth.handleRevert = true;
const swapperContract = new web3.eth.Contract(swapperABI.abi, tokens.SwapperAddress);


async function withdraw(etherAmount)
{
    console.log('ether amount: ' + etherAmount);
    console.log('from contract: ' + tokens.SwapperAddress);
    let promise = new Promise((resolve, reject) => {
        let weiAmount = web3.utils.toWei(etherAmount, "ether");
        contractFunction = swapperContract.methods.withdraw(weiAmount);
        functionAbi = contractFunction.encodeABI();
        console.log("Getting gas estimate");
        Promise.all([web3.eth.getGasPrice()/*, contractFunction.estimateGas()*/])
                    .then((response) => 
        {
            var estimatedPrice = Number(response[0]);
            //var estimatedGas = Number(response[1]);
            //estimatedGas = BigNumber(estimatedGas).decimalPlaces(0).toString(16);
            estimatedPrice = BigNumber(estimatedPrice).decimalPlaces(0).toString(16);
            console.log("Estimated gas price: " + estimatedPrice);
            //console.log("Estimated gas: " + estimatedGas);

            web3.eth.getTransactionCount(tokens.MyAddress).then(_nonce => {
                var nonce = (_nonce).toString(16);
                console.log("Nonce: " + nonce);
                const txParams = {
                    gas: '0x' + '10000', //estimatedGas,
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
        }).catch(error => console.log(error));
    });

    await promise;
}

argvs = process.argv.slice(2);

withdraw(argvs[0]);
