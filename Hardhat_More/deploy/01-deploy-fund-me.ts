import { ContractFactory } from "ethers";
import { network } from "hardhat";
import {networkConfig} from "../helper-hardhat-config"

const chianId = network.config.chainId;

const ethUsdPRiceFeedAddress : any = networkConfig[chainId]["ethUsdPriceFeed"]

export default async(hre : any) => {
    const {getNamedAccounts , deployments} = hre;
    const { deploy , log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId

    // if(chainId is X use address Y)

    const fundMe = await deploy("FundMe" , {from : deployer ,  args: []})
}