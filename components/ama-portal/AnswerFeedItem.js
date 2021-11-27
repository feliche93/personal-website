import { Fragment } from 'react'
import { ethers } from 'ethers'
import { ChatAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import { useEffect } from 'react';
import Blockies from "react-blockies";
import moment from 'moment';
import LoadingSpinner from '../LoadingSpinner';

// const question = [
//   {
//     id: 1,
//     type: 'ask',
//     person: { address: '0xdc33191c2b27f7fad1c8e5e8360a3bb48e2236b9', href: '#' },
//     imageUrl:
//       'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//     text:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
//     date: '6d ago',
//   },
//   {
//     id: 4,
//     type: 'answer',
//     person: { address: 'Felix', href: '#' },
//     imageUrl:
//       'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
//     text:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
//     date: '2h ago',
//   },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AnswerFeed(props) {

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
    setAllQuestions(allQuestions);
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
        <div className="flow-root mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <icon />
          <ul role="list" className="-mb-8">
            {allQuestions[0].map((questionItem, questionItemIdx) => (
              <li key={questionItem.id}>
                <div className="relative pb-8">
                  {questionItem.answered && questionItemIdx === 0 ? (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    {questionItem.type === 'ask' ? (
                      <>
                        <div className="relative">
                          <Blockies
                            seed={questionItem.person.address}
                            size={5}
                            scale={8}
                            className="rounded-xl"
                          />

                          <span className="absolute -bottom-0.5 -right-1 bg-white rounded-xl px-0.5 py-px">
                            <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm">
                              <a href={questionItem.person.href} className="font-medium text-gray-900">
                                {questionItem.person.address}
                              </a>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Asked {questionItem.date}
                            </p>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{questionItem.text}</p>
                          </div>
                        </div>
                      </>
                    ) : questionItem.type === 'answer' && questionItem.answered ? (
                      <>
                        <div className="relative">
                          <img
                            className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                            src={questionItem.imageUrl}
                            alt=""
                          />

                          <span className="absolute -bottom-0.5 -right-1 bg-white rounded-xl px-0.5 py-px">
                            <ChatAltIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm">
                              <a href={questionItem.person.href} className="font-medium text-gray-900">
                                {questionItem.person.address}
                              </a>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Answered {questionItem.date}</p>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{questionItem.text}</p>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) :
        <div className="flow-root mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        (<LoadingSpinner size={20} />)
        </div>
      }
    </>
  )
}