// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

// All functions should be internal in library

    function getLivePrice(AggregatorV3Interface priceFeed) internal view returns(uint256){
            // Two things we need
            // ABI
            // Address 0x694AA1769357215DE4FAC081bf1f309aDC325306 ETH/USD
            (,int256 answer,,,) = priceFeed.latestRoundData(); // This will return price in USD
            return uint256(answer * 1e10);
    }

    function getVersion() internal view returns(uint){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.decimals();
    }

    function getConversionRate(uint ethAmount , AggregatorV3Interface priceFeed) internal view returns(uint){
        uint ethprice = getLivePrice(priceFeed);
        uint ethAmountInUsd = (ethAmount * ethprice) / 1e18; // (ethAmount * ethprice) will give a number with 32 decimal places so we divide it with 1e18
        return ethAmountInUsd;
    }
}