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

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        // Want to be able to set a minimum fund amount in USD
        // 1. How do we send ETH to this contract
        // require(getConversionRate(msg.value) >= minUSD   , "Didn't send enough"); // 
        // Instead we can do 
        require(msg.value.getConversionRate() >= minUSD , "Didn't send enough"); // Using library function here
        funders.push(msg.sender); 
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function getLivePrice() public view returns(uint256){
            // Two things we need
            // ABI
            // Address 0x694AA1769357215DE4FAC081bf1f309aDC325306 ETH/USD
            AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
            (,int256 answer,,,) = priceFeed.latestRoundData(); // This will return price in USD
            return uint256(answer * 1e10);
    }

    function getVersion() public view returns(uint){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.decimals();
    }

    function getConversionRate(uint ethAmount) public view returns(uint){
        uint ethprice = getLivePrice();
        uint ethAmountInUsd = (ethAmount * ethprice) / 1e18; // (ethAmount * ethprice) will give a number with 32 decimal places so we divide it with 1e18
        return ethAmountInUsd;
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