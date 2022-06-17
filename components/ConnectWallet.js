import React from 'react'
import { useState } from 'react';

function ConnectWallet(props) {
  const [currentAccount, setCurrentAccount] = useState("");
  const { type } = props

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      // console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      // console.log(error)
    }
  }

  const mobile = "block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-100 hover:bg-gray-100"
  const desktop = "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100"
  return (
    <>
      {currentAccount !== '' &&
        <button
          onClick={connectWallet}
          disabled={true}
          className={type == 'desktop' ? desktop : mobile}
        >
          Wallet Connected
        </button>
      }
      {currentAccount === '' &&
        <button
          onClick={connectWallet}
          className={type == 'desktop' ? desktop : mobile}
        >
          Connect Wallet
        </button>
      }
    </>
  )
}

export default ConnectWallet
