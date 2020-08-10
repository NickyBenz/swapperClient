var Web3 = require('web3');
const BigNumber = require('bignumber.js');
const TokenValues = require('./tokenVals.js');
const tokens = new TokenValues();

const oneSplitABI = require('./abis/stable.json');
const web3 = new Web3(tokens.ProviderUrl);
const onesplitContract = new web3.eth.Contract(oneSplitABI, tokens.OneSplitAddress);

module.exports = function() { 
    this.fetchRate = function(X, Y, qty, fromDecimals, toDecimals, i, j, myaddress) 
    {
        return new Promise(function(resolve, reject) 
        { 
            onesplitContract.methods.getExpectedReturn(X, Y, 
                    web3.utils.toBN(qty.shiftedBy(fromDecimals).decimalPlaces(0).toString(10)), 
                    100, 0).call({ from: myaddress }, 
                    function (error, result) 
                    {
                        if (error) {
                            reject(error);
                        }
                        else{
                            resolve([new BigNumber(result.returnAmount).shiftedBy(-toDecimals), 
                                     qty, i, j, result.distribution]);
                        }
                    });
        });
    }
};
