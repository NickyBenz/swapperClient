module.exports = class TokenValues {
    constructor() {
       this.SwapperAddress = '0xe7d79b5fd10922cbb943d3ca8793f15a3b5450e3';
       //this.ProviderUrl = 'http://127.0.0.1:8545'
       this.MyAddress = '0x2647733d2153E88d05dFDC53BEF1fee35Ae5B9cf';
       this.ProviderUrl = 'https://mainnet.infura.io/v3/90493710c2034aa2b8c6fabc26d47ec4'; // satya
       //this.ProviderUrl = "https://mainnet.infura.io/v3/fc4efac0aeba4d07848230e833bc0813"; // pravin
       this.OneSplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E";
       
       this.Addrs = {
            BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
            renBTC: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
            wBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            cDAI: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
            DAI : "0x6b175474e89094c44da98b954eedeac495271d0f",
            ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            LINK: "0x514910771af9ca656af840dff83e8264ecf986ca",
            USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            wETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            ZRX: "0xe41d2489571d322189246dafa5ebde1f4699f498",
        };
    
        this.TokenDecimals = {
            BNB: 18,
            renBTC: 8,
            wBTC: 8,
            cDAI: 8,
            DAI: 18,
            ETH: 18,
            LINK: 18,
            USDC: 6,
            USDT: 6,
            wETH: 18,
            ZRX: 18,
        };
        
        this.Keys = Object.keys(this.Addrs);
        this.Decimals = Object.keys(this.TokenDecimals);
        this.Length = this.Keys.length;
        this.PrivateKey = Buffer.from('', 'hex');
    }
}