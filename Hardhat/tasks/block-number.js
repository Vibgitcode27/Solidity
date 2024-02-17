const { task } = require("hardhat/config");

task("block-number" , "Prints current block number").setAction(
    async(taskArgs , hre) => {
        const blockNumber = hre.ethers.provider.getBlockNumber();
        console.log("Current block number is:- " , blockNumber);
    } 
)

module.exports={};