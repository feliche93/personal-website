import React from 'react';
import DaoWalletConnect from '../../components/dao/DaoWalletConnect';
import Layout from '../../components/layout/Layout'
import WebsiteLayout from '../../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';

// Import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { ThirdwebSDK } from "@3rdweb/sdk";
import { Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'

// Include what chains you wanna support.
// 4 = Rinkeby.
const supportedChainIds = [4];

// Include what type of wallet you want to support.
// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {},
};
export default function Index() {

  const [show, setShow] = useState(true)

  return (
    <>
      {/* TODO: Notification to be refactored */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Connect to the Rinkbey Test Nework</p>
                    <p className="mt-1 text-sm text-gray-500">Make sure to connect to the  <b>Rinkbey</b> test network for this demo to run.</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <DaoWalletConnect />
      </ThirdwebWeb3Provider>
    </>
  )
}


Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}