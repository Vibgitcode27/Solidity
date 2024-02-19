import { deployments, ethers, getNamedAccounts } from "hardhat";
import { assert } from "chai";

describe("FundMe", async() => {
    let fundMe : any;
    let deployer;
    let MockV3Aggregator : any;
    beforeEach(async() => {
        // deploy our FundMe contract
        // using Hardhat-deploy
        // const accounts = await ethers.getSigners() // gives address of accounts
        // const accountZero = accounts[0];
        const { deployer } = await getNamedAccounts();
        await deployments.fixture(["all"])  // you can as many tags you want
        fundMe = await ethers.getContractAt("FundMe" , deployer);
        MockV3Aggregator = await ethers.getContractAt("MockV3Aggregator" , deployer);
        console.log(fundMe);
    })

    describe("constructor" , async() => {
        it("sets the aggregator address correctly" , async() => {
            const response = await fundMe.getPriceFeed();
            assert.equal(response , MockV3Aggregator.address);
        })
    })
}) 