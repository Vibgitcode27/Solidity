const { ethers } = require("hardhat");
const {assert , expect} = require("chai");

describe("SimpleStorage" , () => {
    let SimpleStorageFactory;
    let SimpleStorage;
    beforeEach(async() => {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy();
    })

    it("SHould start with a favourite number of 0" , async() =>{
        const currentValue = await SimpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue) 
    })

    it("It should update when we call store" , async() => {
        const expectedValue = "7";
        const response = await SimpleStorage.store(expectedValue);
        await response.wait(1);

        const updatedValue = await SimpleStorage.retrieve();
        assert.equal(updatedValue.toString() , expectedValue);
    })

    it("Maps favourite number to the user" , async() => {
        const name = "Vibhor";
        const favNumber = "27";
        const response = await SimpleStorage.addPerson(name , favNumber);
        await response.wait(1);

        const storedFavNumber = await SimpleStorage.nameToFavouriteNumber(name);
        assert.equal(storedFavNumber.toString(), favNumber);
    })
});

