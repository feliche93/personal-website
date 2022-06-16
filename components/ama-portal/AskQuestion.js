import React from 'react'
import { useState } from 'react';
import { ethers } from "ethers";
import SimpleNotification from '../../components/SimpleNotification';
import LoadingSpinner from '../LoadingSpinner';

function AskQuestion(props) {
  const { contractAddress, contractAbi } = props
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    header: "",
    txn: "",
  });

  console.log(contractAddress, contractAbi);

  const askQuestion = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setLoading(true)
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const amaPortalContract = new ethers.Contract(contractAddress, contractAbi, signer);

        let questionTxn = await amaPortalContract.askQuestion(question);
        console.log("Mining...", questionTxn.hash);
        setNotification({
          show: true,
          message: "Please wait a few seconds for the transaction to be confirmed ",
          header: "Transaction submitted",
          txn: questionTxn.hash
        });


        await questionTxn.wait();
        setQuestion("")
        setLoading(false)

        console.log("Mined -- ", questionTxn.hash);
        setNotification({
          show: true,
          message: "Check transaction details ",
          header: "Transaction confirmed",
          txn: questionTxn.hash
        });




      } else {
        console.log("Ethereum object doesn't exist!");
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
      <SimpleNotification notification={notification} setNotification={setNotification} />
      <div>
        <div className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="block text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl">
            Ask Me Anything!
          </h2>
          <p className="block text-3xl font-extrabold tracking-tight text-blue-600 sm:block sm:text-4xl">
            The Web3 Native Way.
          </p>
          <div className="mt-8 sm:flex">
            <label htmlFor="question" className="sr-only">
              Question
            </label>
            <input
              onChange={(e) => setQuestion(e.target.value)}
              id="question"
              name="question"
              type="textarea"
              value={question}
              required
              rows="1"
              className="w-full sm:max-w-xl px-5 py-3 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              placeholder="What is your favorite Programming Language?"
            />
            {!loading ? (
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  onClick={askQuestion}
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>)
              :
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <LoadingSpinner size={12} />
              </div>
            }
          </div>
        </div>
      </div>
    </>


  )
}

export default AskQuestion;
