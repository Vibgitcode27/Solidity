// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract FallbackExample {
    uint public result;

    // gets called when ETH is send without data without any specific function called
    receive() external payable 
    { 
        result = 1;
    }

    // gets called when ETH is send with data any specific function called
    fallback() external payable {
        result = 2;
     }
}