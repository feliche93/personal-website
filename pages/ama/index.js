import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import AMALayout from '../../components/layout/AMALayout';
import AskQuestion from '../../components/ama-portal/AskQuestion';
import abi from '../../artifacts/contracts/AMAPortal.sol/AMAPortal.json';
import AnswerFeedList from '../../components/ama-portal/AnswerFeedList';

export default function AmaHome() {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xb91671A21b25a11eAd0d2b4cCadAe5b154941916";
  const contractAbi = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div>
      <AskQuestion
        contractAbi={contractAbi}
        contractAddress={contractAddress}
      />
      <AnswerFeedList
        contractAbi={contractAbi}
        contractAddress={contractAddress}
      />
    </div>
  )
}

AmaHome.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AMALayout>{page}</AMALayout>
    </Layout>
  )
}