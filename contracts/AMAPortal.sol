// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AMAPortal {
    using Counters for Counters.Counter;

    Counters.Counter private _QuestionIds;
    Counters.Counter private _QuestionAnswered;

    struct Question {
        uint256 questionId;
        address askedBy;
        string question;
        string answer;
        uint256 upvotes;
        bool answered;
    }

    mapping(uint256 => Question) public idToQuestion;
    address owner;

    constructor() {
        owner = msg.sender;
        console.log("Owner of the contract: %s", owner);
    }

    function answerQuestion(uint256 _questionId, string memory _answer) public {
        require(owner == msg.sender, "Only the owner can answer a question");
        require(
            !idToQuestion[_questionId].answered,
            "Question already answered"
        );

        idToQuestion[_questionId].answered = true;
        idToQuestion[_questionId].answer = _answer;

        _QuestionAnswered.increment();
    }

    function askQuestion(string memory _questionText) public {
        require(
            bytes(_questionText).length > 0,
            "Question text cannot be empty."
        );

        _QuestionIds.increment();
        uint256 _questionId = _QuestionIds.current();

        console.log("Question ID: %s", _questionId);

        Question memory question = Question(
            _questionId,
            address(msg.sender),
            _questionText,
            "",
            0,
            false
        );

        idToQuestion[_questionId] = question;
    }

    function upvoteQuestion(uint256 _questionId) public {
        idToQuestion[_questionId].upvotes++;
    }
}
