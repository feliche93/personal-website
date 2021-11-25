import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import AMALayout from '../../components/layout/AMALayout';
export default function Index() {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
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
        setCurrentAccount(account)
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
      <h1>Ask me anythin</h1>
    </div>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AMALayout>{page}</AMALayout>
    </Layout>
  )
}