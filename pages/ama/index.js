import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import AMALayout from '../../components/layout/AMALayout';
import AskQuestion from '../../components/ama-portal/AskQuestion';
import abi from '../../artifacts/contracts/AMAPortal.sol/AMAPortal.json';
import AnswerFeedItem from '../../components/ama-portal/AnswerFeedItem';

export default function AmaHome() {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x57991Af302945854AADC167ed5414Ec88f38d80b";
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
      <AnswerFeedItem
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