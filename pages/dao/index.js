import React from 'react';
import DaoWalletConnect from '../../components/dao/DaoWalletConnect';
import Layout from '../../components/layout/Layout'
import WebsiteLayout from '../../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';

// Import ThirdWeb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { ThirdwebSDK } from "@3rdweb/sdk";


// Include what chains you wanna support.
// 4 = Rinkeby.
const supportedChainIds = [4];

// Include what type of wallet you want to support.
// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {},
};
export default function Index() {

  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <DaoWalletConnect />
    </ThirdwebWeb3Provider>
  )
}


Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}