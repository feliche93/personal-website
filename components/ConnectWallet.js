import React from 'react'

function ConnectWallet(props) {
  const { type } = props

  const mobile = "block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100"
  const desktop = "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
  return (
    <button
      className={type == 'desktop' ? desktop : mobile}
    >
      Connect Wallet
    </button>
  )
}

export default ConnectWallet
