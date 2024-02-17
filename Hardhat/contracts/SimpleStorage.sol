// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    // boolean , uint , int , address , bytes
    uint256 public favouriteNumber;
    People public person = People({favouriteNumber : 2 , name : "Vibhor"});
    People[] public people;
    struct People {
        uint favouriteNumber;
        string name;
    }

    //mapping
    mapping(string => uint256) public nameToFavouriteNumber;



    function store(uint _FavouriteNumber) public virtual {
        favouriteNumber = _FavouriteNumber;
    }

    function addPerson(string memory _name , uint256 _favouriteNumber) public {
        People memory newPeople = People({favouriteNumber : _favouriteNumber , name : _name});
        people.push(newPeople);
        // people.push(People(_favouriteNumber , _name));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }

    function retrieve() public view returns (uint256){
        return favouriteNumber;
    }
    // calldata , memory , storage

}