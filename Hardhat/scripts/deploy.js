const { ethers , run , network} = require("hardhat");

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying Contract ......");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  // await SimpleStorage.deployed();
  const address = await SimpleStorage.getAddress();
  console.log(`Deployed contract to:  ${address}`);
  // if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY)
  // {
    //   await verify(SimpleStorage.getAddress(), [])
    // };
    
  // await SimpleStorage.deploymentTransaction().wait(6);
  const currentValue = await SimpleStorage.retrieve();
  console.log("Current Value is " ,currentValue);

  const updateCurrentValue = await SimpleStorage.store("20");
  await updateCurrentValue.wait(1);

  const updatedValue = await SimpleStorage.retrieve();
  console.log("Current Value is " ,updatedValue);

}

const verify = async(contractAddress , args) => {
  console.log("verifying contract ... ");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified"))
    {
      console.log("Alredy Verified");
    } else {
      console.log(error);
    }
    }
}

main()