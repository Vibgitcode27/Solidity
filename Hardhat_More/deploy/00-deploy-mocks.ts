import { network } from "hardhat";
import { developmentChain , DECIMALS , INITIAL_ANSWER } from "../helper-hardhat-config"

export default async(hre : any) => {
    const {getNamedAccounts , deployments} = hre;
    const { deploy , log} = deployments;
    const {deployer} = await getNamedAccounts();

    // if(chainId is X use address Y)
    if(developmentChain.includes(network.name))
    {
        log("Local netwk detected! Deploying mocks....")
        await deploy("MockV3Aggregator" , {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS ,INITIAL_ANSWER]
        })
        log("Mocks Deployed");
        log("________________________________________________________________________________________");
    }
}

module.exports.tags = ["all" , "mocks"];