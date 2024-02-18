import "@nomicfoundation/hardhat-toolbox";
// const dotenv = require("dotenv");
// dotenv.config();
import "dotenv/config";
import "@nomicfoundation/hardhat-verify";
import "./tasks/block-number";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@typechain/hardhat"; // generate Typechain typings for compiled contracts
// import "@nomiclabs/hardhat-ethers"

// @type import('hardhat/config').HardhatUserConfig

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKET_CAP_KEY = process.env.COINMAKET_CAP_KEY;

console.log(COINMARKET_CAP_KEY)

module.exports = {
  defaultNetwork : "hardhat",
  networks : {
    sepolia : {
      url : SEPOLIA_RPC_URL,
      accounts : [PRIVATE_KEY],
    },
  },
  solidity: "0.8.24",
  etherscan: {
    apiKey : ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled : false,
    outputFile : "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET_CAP_KEY,
    token: "MATIC",
  }
};