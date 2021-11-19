// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    // Counts to show stats in frontend, e.g. how many were sold (_itemsSold), how many items are there in total (_itemIds), etc.
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    // Determine who is the owner of the contract so that they can make a comission on the item sold
    address payable owner;

    // Listing price of token where we deploy to (e.g. Matic 1 Matic = 0,03 Euro)
    uint256 listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // Too keep up with every market item creation
    mapping(uint256 => MarketItem) private idToMarketItem;

    // Event when a market item is created so can be tracked in frontend
    event MarketItemCreated(
        uint256 itemId,
        address nftContract,
        uint256 tokenId,
        address payable seller,
        address payable owner,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Function for creating a market item
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        // Minimum price for a market item
        require(price > 0, "Price must be greater than 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            // Person who is sellingg this item
            payable(msg.sender),
            // Owner is no one riht now because item has not been sold yet
            payable(address(0)),
            price,
            false
        );

        // Transfer the ownership to the contract itself, person who is writing this takes ownership to next item
        // TODO: Check out safe transfer
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            // Person who is sellingg this item
            msg.sender,
            // Owner is no one riht now because item has not been sold yet
            address(0),
            price,
            false
        );
    }

    function sellMarketItem(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        // Send money to the seller
        idToMarketItem[itemId].seller.transfer(msg.value);

        // Send digital assset to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // Updating ownership to the buyer
        idToMarketItem[itemId].owner = payable(msg.sender);

        // Mark item as sold
        idToMarketItem[itemId].sold = true;

        // Keeping up with number of items sold
        _itemsSold.increment();

        // Pay the first owner of the contract, a commission
        payable(owner).transfer(listingPrice);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 itemsSoldCount = _itemsSold.current();
        uint256 unsoldItemCount = itemCount - itemsSoldCount;

        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Figure out how many items a person owns
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        // Set length of array to the number of items a person owns
        MarketItem[] memory items = new MarketItem[](itemCount);

        // Loop over total items and add items to array
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Figure out how many items a person created
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        // Set length of array to the number of items a person owns
        MarketItem[] memory items = new MarketItem[](itemCount);

        // Loop over total items and add items to array
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
