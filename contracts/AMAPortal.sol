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
        uint256 timestampAsked;
        address answeredBy;
        string answer;
        uint256 timestampAnswered;
        uint256 upvotes;
        bool answered;
    }

    mapping(uint256 => Question) public idToQuestion;
    address owner;

    constructor() {
        owner = msg.sender;
        console.log("Owner of the contract: %s", owner);
    }

    function askQuestion(string memory _questionText) public {
        require(
            bytes(_questionText).length > 0,
            "Question text cannot be empty."
        );

        _QuestionIds.increment();
        uint256 _questionId = _QuestionIds.current();

        Question memory question = Question(
            _questionId,
            address(msg.sender),
            _questionText,
            block.timestamp,
            address(0),
            "",
            0,
            0,
            false
        );

        idToQuestion[_questionId] = question;
    }

    function answerQuestion(uint256 _questionId, string memory _answer) public {
        require(owner == msg.sender, "Only the owner can answer a question");
        require(
            !idToQuestion[_questionId].answered,
            "Question already answered"
        );

        idToQuestion[_questionId].answeredBy = msg.sender;
        idToQuestion[_questionId].timestampAnswered = block.timestamp;
        idToQuestion[_questionId].answered = true;
        idToQuestion[_questionId].answer = _answer;

        _QuestionAnswered.increment();
    }

    function upvoteQuestion(uint256 _questionId) public {
        idToQuestion[_questionId].upvotes++;
    }

    function fetchAllQuestions() public view returns (Question[] memory) {
        uint256 questionCount = _QuestionIds.current();

        uint256 currentIndex = 0;

        Question[] memory questions = new Question[](questionCount);
        for (uint256 i = 0; i < questionCount; i++) {
            uint256 currentId = idToQuestion[i + 1].questionId;
            Question storage currentQuestion = idToQuestion[currentId];
            questions[currentIndex] = currentQuestion;
            currentIndex += 1;
        }
        return questions;
    }

    function fetchAnsweredQuestions() public view returns (Question[] memory) {
        uint256 questionCount = _QuestionIds.current();
        uint256 questionAnsweredCount = _QuestionAnswered.current();

        uint256 currentIndex = 0;

        Question[] memory questions = new Question[](questionAnsweredCount);
        for (uint256 i = 0; i < questionCount; i++) {
            // Only answered questions
            if (idToQuestion[i + 1].answered) {
                uint256 currentId = idToQuestion[i + 1].questionId;
                Question storage currentQuestion = idToQuestion[currentId];
                questions[currentIndex] = currentQuestion;
                currentIndex += 1;
            }
        }
        return questions;
    }

    function fetchUnansweredQuestions()
        public
        view
        returns (Question[] memory)
    {
        uint256 questionCount = _QuestionIds.current();
        uint256 questionAnsweredCount = _QuestionAnswered.current();
        uint256 unansweredQuestions = questionCount - questionAnsweredCount;

        uint256 currentIndex = 0;

        Question[] memory questions = new Question[](unansweredQuestions);
        for (uint256 i = 0; i < questionCount; i++) {
            // Only answered questions
            if (!idToQuestion[i + 1].answered) {
                uint256 currentId = idToQuestion[i + 1].questionId;
                Question storage currentQuestion = idToQuestion[currentId];
                questions[currentIndex] = currentQuestion;
                currentIndex += 1;
            }
        }
        return questions;
    }
}
