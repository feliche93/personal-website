import { ChatAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'
import Blockies from "react-blockies";


export default function AnswerFeed(props) {

  const { question } = props;

  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-md px-6 py-4">
        <icon />
        <ul role="list" className="-mb-8">
          {question.map((questionItem, questionItemIdx) => (
            <li key={questionItem.id}>
              <div className={!questionItem.answered ? "relative pb-4" : "relative pb-8"}>
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
                          <QuestionMarkCircleIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href={questionItem.person.href} className="font-medium text-gray-900">
                              {questionItem.person.address}
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-600">Asked {questionItem.date}
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
                        <Blockies
                          seed={questionItem.person.address}
                          size={5}
                          scale={8}
                          className="rounded-xl"
                        />

                        <span className="absolute -bottom-0.5 -right-1 bg-white rounded-xl px-0.5 py-px">
                          <ChatAltIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href={questionItem.person.href} className="font-medium text-gray-900">
                              {questionItem.person.address === "0xDc33191c2b27F7fAD1C8e5e8360a3bb48e2236B9" ? "Felix (0xDc33191c2b27F7fAD1C8e5e8360a3bb48e2236B9)" : questionItem.person.address}
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-600">Answered {questionItem.date}</p>
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
    </>
  )
}