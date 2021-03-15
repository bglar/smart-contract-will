// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.8.0;

/**
 * Contract for maintaining ownership
 */
contract Owned {

    address public owner;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // Default constructor
    constructor () public {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Caller is not owner"
        );
        _;
    }

    // Transfer ownership to the address of new owner.
    function transferOwnership(address newOwner) public onlyOwner {
        emit OwnerSet(owner, newOwner);
        if (newOwner != address(0) && newOwner != owner) {
            owner = newOwner;
        }
    }

    function getOwner() public view returns (address) {
        return owner;
    }

}
