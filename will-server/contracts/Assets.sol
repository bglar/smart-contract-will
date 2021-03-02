// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Assets {
    uint public propertyCount = 0;

    struct Property {
        uint id;
        string name;
        string description;
        string propertyType;
        bool active;
    }

    event PropertyCreated(
        uint id,
        string name,
        string description,
        string propertyType,
        bool active
    );

    mapping(uint => Property) public properties;

    constructor() public {
        createProperty("Dummy Property", "Just a dummy property", "TEST");
    }

    function createProperty(string memory _name, string memory _description, 
                            string memory _propertyType) public {
        propertyCount ++;
        properties[propertyCount] = Property(
            propertyCount, _name, _description, _propertyType, true
        );

        emit PropertyCreated(propertyCount, _name, _description, _propertyType, true);
    }

}
