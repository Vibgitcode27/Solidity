import { network } from "hardhat";

export default async(hre : any) => {
    const {getNamedAccounts , deployments} = hre;
    const { deploy , log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId
}