// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error OwnerError();

contract FundMe{
    using PriceConverter for uint256;

    uint public constant minUSD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public owner;

    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        // Want to be able to set a minimum fund amount in USD
        // 1. How do we send ETH to this contract
        // require(getConversionRate(msg.value) >= minUSD   , "Didn't send enough"); // 
        // Instead we can do 
        require(msg.value.getConversionRate(priceFeed) >= minUSD , "Didn't send enough"); // Using library function here
        funders.push(msg.sender); 
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner{
        // require(msg.sender == owner , "Sender is not owner");

        for (uint funderIndex ; funderIndex < funders.length; funderIndex ++) 
        {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0; 
        }
        // reset the array
        funders = new address[](0);
        // actually withdraw the funds
        // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // send 
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send Failed");
        // call
        (bool callSuccess, /*bytes memory dataReturned*/) = payable(msg.sender).call{value : address(this).balance}("");
        require(callSuccess , "Call Failed");
    }

    modifier onlyOwner {
        // require(msg.sender == owner , "Sender is not owner");
        if(msg.sender != owner)
        {
            revert OwnerError();
        }
        _;
    }

    // What happens if someone sends ETH without calling any function

    // Solidity has few special functions
    // receive()
    // fallabck()

    receive() external payable {
        fund();
     }

    fallback() external payable {
        fund();
     }
}