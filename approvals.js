var Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();
const oneSplitABI = require('./abis/onesplit.json');
const erc20ABI = require('./abis/erc20.json');
const web3 = new Web3(tokens.ProviderUrl);

function executeApprove(tokenInstance, tokenAddress, receiver, tokens)
{
    convertedAmount =  web3.utils.toWei('100', "ether" );
    contractFunction = tokenInstance.methods.approve(receiver, convertedAmount);
    functionAbi = contractFunction.encodeABI();
    let estimatedGas;
    let nonce;
    console.log("Getting gas estimate");
    Promise.all([contractFunction.estimateGas({from: tokens.MyAddress}), web3.eth.getGasPrice()])
    .then((response) => {
      estimatedGas = response[0].toString(16);
      console.log("Estimated gas: " + estimatedGas);
      estimatedPrice = Number(response[1]).toString(16);
      console.log("Estimated gas price: " + estimatedPrice);

      web3.eth.getTransactionCount(tokens.MyAddress).then(_nonce => {
        nonce = _nonce.toString(16);
    
        console.log("Nonce: " + nonce);

        const txParams = {
          gasPrice: '0x' + estimatedPrice,
          gasLimit: '0x' + estimatedGas,
          to: tokenAddress,
          data: functionAbi,
          from: tokens.MyAddress,
          nonce: '0x' + nonce
        };
    
        const tx = new Tx(txParams);
        tx.sign(tokens.PrivateKey);
    
        const serializedTx = tx.serialize();
    
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, result){
            if (err)
            {
                console.log(err);
            }
            else
            {
                console.log(result);
            }
        }).on('receipt', receipt => {
          console.log(receipt);
          tokenInstance.methods.allowance(tokens.MyAddress, receiver).call( function(error, result) {
                if (error) { 
                    console.log(error);
                } else {
                    
                }
          });
        });
      });
    });
}

function approveToken(tokenAddress, receiver, tokens) {
    tokenInstance = new web3.eth.Contract(erc20ABI, tokenAddress);
    tokenInstance.methods.allowance(tokens.MyAddress, receiver).call( 
    function (error, result) 
    {
        if (error) {
            console.log(error);
        }
        else{
            if (result < 1)
            {
                executeApprove(tokenInstance, tokenAddress, receiver, tokens);   
            }
        }
    });    
}


approveToken(tokens.Addrs[tokens.Keys[13]], tokens.OneSplitAddress, tokens);
