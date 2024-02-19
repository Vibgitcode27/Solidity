// SPDX-License-Identifier: MIT
//pragma
pragma solidity ^0.8.0;
//Imports
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// Interfaces , Libraries , Contracts
import "./PriceConverter.sol";
// Error codes
error FundMe__OwnerError();


/**
 * @title A contract for croud funding
 * @author Patrick Collins
 * @notice This contract is to demo a sample funding contract
 */
contract FundMe{
    using PriceConverter for uint256;

    uint public constant minUSD = 50 * 1e18;
    
    // State Variables
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    address public owner;

    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /**
     * @notice This function funds this contract
     * @dev THis implements price feeds as out library
     */
    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= minUSD , "Didn't send enough"); // Using library function here
        funders.push(msg.sender); 
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }

    function withdraw() public onlyOwner{
        // require(msg.sender == owner , "Sender is not owner");

        for (uint funderIndex ; funderIndex < funders.length; funderIndex ++) 
        {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0; 
        }
        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{value : address(this).balance}("");
        require(callSuccess , "Call Failed");
    }

    modifier onlyOwner {
        if(msg.sender != owner)
        {
            revert FundMe__OwnerError();
        }
        _;
    }
    receive() external payable {
        fund();
     }

    fallback() external payable {
        fund();
     }
}