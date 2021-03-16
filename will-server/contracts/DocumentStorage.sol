// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.8.0;
pragma experimental ABIEncoderV2;

import "./base/Owned.sol";

contract DocumentStorage is Owned {

    /**
        Represents a Documents 
        (Uploaded Will and Testament in our case.)
    */
    struct Document {
        string name;
        string ipfsDocumentHash;
        string md5;
        string notifyEmail;
        uint createdOn;
        string signature;
    }

    // Document internals
    mapping(string => Document) private documents;
    mapping(string => string[]) private documentOwners;
    mapping(string => string) public ipfsStore;
    string[] public owners;
    uint public ownerID = 0;

    // Document Events
    event Upload(string personName, string documentHash, Document document);
    event ipfsSent(string _ipfsHash, string _address);

    // Document Modifiers
    modifier unFilled (string memory _string) {
        bytes memory stringDoc = bytes(_string);
        require(stringDoc.length == 0);
        _;
    }

    /**
        Helper method to  interact with Inter Planetary File Storage.
        IPFS is used here to continue with the spirit of a peer-to-peer network
        Pass the hash from IPFS and address of receiver.
    */    
    function sendIPFS(string memory _address, string memory _ipfsHash) unFilled(
            ipfsStore[_address]) public{
        ipfsStore[_address] = _ipfsHash;
        emit ipfsSent(_ipfsHash, _address);
    }

    function getHash(string memory _address) public view returns(string memory) {
        string memory ipfs_hash = ipfsStore[_address];
        return ipfs_hash;
    }

    function upload(string memory _personName, string memory _ipfsDocumentHash,
                    string memory _md5, string memory _documentName, 
                    string memory _documentSign, string memory _notifyEmail) onlyOwner public {
        ownerID++;
        owners.push(_personName);
        Document memory doc = Document(_documentName, _ipfsDocumentHash, _md5, 
                                       _notifyEmail, block.timestamp, _documentSign);
        documents[_ipfsDocumentHash] = doc;
        emit Upload(_personName, _ipfsDocumentHash, doc);
    }

    function checkDocExists(string memory _ipfsDocumentHash) onlyOwner
            public view returns (bool) {
        if (documents[_ipfsDocumentHash].createdOn > 0) {
            return true;
        }
        return false;
    }

    function getOwnerName(uint id) onlyOwner public view returns (string memory) {
        return owners[id];
    }

    function getDocumentInfo(string memory _ipfsDocumentHash) 
            onlyOwner public view returns (Document memory) {
        return documents[_ipfsDocumentHash];
    }

}
