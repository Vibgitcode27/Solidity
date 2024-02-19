import { network } from "hardhat";
import {networkConfig} from "../helper-hardhat-config"
import { developmentChain , DECIMALS , INITIAL_ANSWER } from "../helper-hardhat-config"

const chainId = network.config.chainId;
console.log("chainId" , chainId);

if (chainId === undefined) {
  throw new Error("Chain ID is undefined");
}

// const ethUsdPRiceFeedAddress : string = networkConfig[chainId]["ethUsdPriceFeed"]


export default async(hre : any) => {
    const {getNamedAccounts , deployments} = hre;
    const { deploy , log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId!


    let ethUsdPRiceFeedAddress;
    if(developmentChain.includes(network.name))
    {
      const ethUsdAggregator = await deployments.get("MockV3Aggregator");
      ethUsdPRiceFeedAddress = ethUsdAggregator.address;
    }
    else {
      ethUsdPRiceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    // if(chainId is X use address Y)

    const fundMe = await deploy("FundMe" , {from : deployer ,  args: [ethUsdPRiceFeedAddress] , log : true})
}

module.exports.tags = ["all" , "fundme"]