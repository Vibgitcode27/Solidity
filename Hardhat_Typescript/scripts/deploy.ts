import { ethers , run , network} from "hardhat";


const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying Contract ......");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  // await SimpleStorage.deployed();
  const address = await SimpleStorage.getAddress();
  console.log(`Deployed contract to:  ${address}`);
  // if(process.env.ETHERSCAN_API_KEY)
  // {
  //     await verify(address, [])
  // };
    
  await SimpleStorage.deploymentTransaction()!.wait(1);
  const currentValue = await SimpleStorage.retrieve();
  console.log("Current Value is " ,currentValue);

  const updateCurrentValue = await SimpleStorage.store("20");
  await updateCurrentValue.wait(1);

  const updatedValue = await SimpleStorage.retrieve();
  console.log("Current Value is " ,updatedValue);

}

const verify = async(contractAddress : string , args : any) => {
  console.log("verifying contract ... ");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error : any) {
    if(error.message.toLowerCase().includes("already verified"))
    {
      console.log("Alredy Verified");
    } else {
      console.log(error);
    }
    }
}

main()