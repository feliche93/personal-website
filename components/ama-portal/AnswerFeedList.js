import React from 'react'
import AnswerFeedItem from './AnswerFeedItem'

import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import LoadingSpinner from '../LoadingSpinner';
import { Fragment } from 'react'
import { ethers } from 'ethers'

function AnswerFeedList(props) {

  const { contractAddress, contractAbi } = props
  const [allQuestions, setAllQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadAllQuestions() {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const amaPortalContract = new ethers.Contract(contractAddress, contractAbi, provider);

    const data = await amaPortalContract.fetchAllQuestions()

    const allQuestions = await Promise.all(data.map(async i => {
      const timestampAsked = moment.unix(i.timestampAsked).fromNow();;
      const timestampAnswered = moment.unix(i.timestampAnswered).fromNow();;
      let question = [
        {
          id: i.questionId + 'q',
          type: 'ask',
          person: { address: i.askedBy, href: `https://mumbai.polygonscan.com/address/${i.askedBy}` },
          text: i.question,
          date: timestampAsked,
          answered: i.answered
        },
        {
          id: i.questionId + 'a',
          type: 'answer',
          person: { address: i.answeredBy, href: `https://mumbai.polygonscan.com/address/${i.answeredBy}` },
          text: i.answer,
          date: timestampAnswered,
          answered: i.answered,
        }
      ]

      return question;
    }))
    setAllQuestions(allQuestions.reverse());
    console.log(allQuestions[0]);
    setLoading(false);
  }

  useEffect(() => {
    loadAllQuestions()
  }, [])

  const allQuestionsReady = allQuestions && allQuestions.length > 0


  return (
    <>
      {allQuestionsReady ? (
        <ul role="list" className="space-y-3">
          {allQuestions.map((question) => (
            <AnswerFeedItem
              question={question}
            />
          ))}
        </ul>
      ) :
        <div className="flow-root mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          (<LoadingSpinner size={20} />)
        </div>
      }
    </>
  )
}

export default AnswerFeedList
