// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        // Increment the token ID, starts off at 0
        _tokenIds.increment();

        // First token ID will be 1, second 2, etc.
        uint256 newItemId = _tokenIds.current();

        // Mint token who is the message sender
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Give the marketplace to transact the token between different users
        setApprovalForAll(contractAddress, true);

        return newItemId;
    }
}
