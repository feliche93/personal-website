import { ShareButtons } from './../components/ShareButtons';
import Layout from '../components/layout/Layout';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import useSWR from 'swr';
import axios from 'axios';
import FeesForm from '../components/fees-calculator/FeesForm';
import FeesFormCard from '../components/fees-calculator/FeesFormCard';
import CurrencyInput from '../components/fees-calculator/CurrencyInput';
import { useState } from 'react';
import UsedGasInput from '../components/fees-calculator/UsedGasInput';
import GasPriceRadio from '../components/fees-calculator/GasPriceRadio';
import Table from '../components/fees-calculator/Table';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import gitcoinGrant from '../public/logos/gitcoinGrant.svg';

export default function GasFeesCalculator(props) {
  const { activeCurrency, networkPrices, fiatRates, currencies } = props;

  // STATE
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrency);
  const [selectedGasPrice, setSelectedGasPrice] = useState('standard');
  const [usedGas, setUsedGas] = useState(21000);

  return (
    <>
      <NextSeo
        title='Gas Fees Calculator (Multi Currency, Network & Txn Types)'
        description='Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony.'
        openGraph={{
          url: 'https://www.url.ie/a',
          title: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
          description:
            'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony.',
          images: [
            {
              url: 'https://www.cryptoneur.xyz/screenshots/gas-fees-calculator-screenshot.png',
              width: 1928,
              height: 906,
              alt: 'Gas Fees Calculator (Multi Currency & Network)',
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div>
          <div className='max-w-7xl mx-auto px-4 pb-5 sm:pt-12 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h2 className='text-base font-semibold text-blue-600 tracking-wide uppercase'>
                Gas Fees Calculator
              </h2>
              <p className='mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-4xl'>
                Sick of Paying too high gas fees?
              </p>
              <p className='max-w-4xl mt-5 mx-auto text-xl text-gray-500'>
                Start calculating gas fees for the biggest networks at different
                transaction speeds in your own local currency for a variety of
                transcations.
              </p>
            </div>
          </div>
        </div>
        <a href="https://gitcoin.co/grants/5753/gas-fees-calculator-multi-currency-network-txn-ty"
          target={'_blank'}
          rel="noopener noreferrer"

        >
          <div className='flex flex-col items-center'>
            <Image
              src={gitcoinGrant}
              height={100}
              width={300}
            />
            <p className='text-gray-500 px-5 text-center'>Support this public good through a Gitcoin Grant.</p>
          </div>
        </a>
        <ShareButtons
          size={38}
          title={'Found the calculator helpful? Share it with others:'}
          shareTitle={
            'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Binance Smart Chain, Avalanche, Polygon, Fantom and Harmony.'
          }
          shareUrl={'https://www.cryptoneur.xyz/gas-fees-calculator'}
        />
        <FeesForm>
          <FeesFormCard
            title='Local Currency'
            description='Select the currency you want the fees to be displayed in.'
          >
            <CurrencyInput
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              currencies={currencies}
            />
          </FeesFormCard>
          <FeesFormCard
            title='Used Gas'
            description='Every transaction uses gas. Pick a common transaction type or enter a custom amount of gas used.'
          >
            <UsedGasInput usedGas={usedGas} setUsedGas={setUsedGas} />
          </FeesFormCard>
          <FeesFormCard
            title='Gas Price'
            description="Gas fees are paid in each network's native currency."
          >
            <GasPriceRadio
              selectedGasPrice={selectedGasPrice}
              setSelectedGasPrice={setSelectedGasPrice}
            />
          </FeesFormCard>
        </FeesForm>
        <Table
          selectedGasPrice={selectedGasPrice}
          usedGas={usedGas}
          selectedCurrency={selectedCurrency}
          networkPrices={networkPrices}
        />
        <div className='mt-10 flex items-center  justify-center'>
          <a href='https://zapper.fi/' target='_blank'>
            <img
              className='object-center'
              src='/logos/power-zap-black.svg'
              alt=''
            />
          </a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const API_KEY = process.env.NEXT_PUBLIC_ZAPPER_API_KEY;
  const API_URL = 'https://api.zapper.fi/v2';

  const currencies = [
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'HKD',
    'NZD',
    'SEK',
    'KRW',
    'SGD',
    'NOK',
    'MXN',
    'INR',
    'RUB',
    'ZAR',
    'TRY',
    'BRL',
    'TWD',
    'DKK',
    'PLN',
    'THB',
    'IDR',
    'HUF',
    'CZK',
    'ILS',
    'CLP',
    'PHP',
    'AED',
    'COP',
    'SAR',
    'MYR',
    'RON',
  ];

  const networks = [
    {
      network: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      coinGeckoId: 'ethereum',
      website: 'https://ethereum.org/',
      image: '/networks/ethereum_logo.png',
      type: 'Layer 1',
    },
    {
      network: 'arbitrum',
      symbol: 'ETH',
      name: 'Arbitrum One',
      coinGeckoId: 'ethereum',
      website: 'https://offchainlabs.com/',
      image: '/networks/arbitrum_one_logo.jpeg',
      type: 'Layer 2',
    },
    {
      network: 'optimism',
      symbol: 'ETH',
      name: 'Optimism',
      coinGeckoId: 'ethereum',
      website: 'https://optimism.io/',
      image: '/networks/optimism_logo.jpeg',
      type: 'Layer 2',
    },
    {
      network: 'binance-smart-chain',
      symbol: 'BNB',
      name: 'Binance Smart Chain',
      coinGeckoId: 'binancecoin',
      website: 'https://www.binance.org/en/smartChain',
      image: '/networks/binance_smart_chain_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'avalanche',
      name: 'Avalanche',
      symbol: 'AVAX',
      coinGeckoId: 'avalanche-2',
      website: 'https://www.avax.network/',
      image: '/networks/avalanche_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      coinGeckoId: 'matic-network',
      website: 'https://hermez.io/',
      image: '/networks/polygon_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'gnosis',
      name: 'Gnosis',
      symbol: 'XDAI',
      coinGeckoId: 'xdai',
      website: 'https://www.xdaichain.com/',
      image: '/networks/gnosis_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'celo',
      name: 'Celo',
      symbol: 'CELO',
      coinGeckoId: 'celo',
      website: 'https://celo.org/',
      image: '/networks/celo_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'moonriver',
      name: 'Moonriver',
      symbol: 'MOVR',
      coinGeckoId: 'moonriver',
      website: 'https://moonbeam.network/networks/moonriver/',
      image: '/networks/moonriver_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'fantom',
      symbol: 'FTM',
      name: 'fantom',
      coinGeckoId: 'fantom',
      website: 'https://fantom.foundation/',
      image: '/networks/fantom_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'harmony',
      symbol: 'ONE',
      name: 'Harmony',
      coinGeckoId: 'harmony',
      website: 'https://www.harmony.one/',
      image: '/networks/harmony_logo.png',
      type: 'Sidechain',
    },
  ];

  const fetchFiatRates = async () => {

    let ids = networks.map(network => network.coinGeckoId).join(',');

    try {
      const res = await axios({
        method: 'get',
        url: 'https://api.coingecko.com/api/v3/simple/price',
        params: {
          ids,
          vs_currencies: currencies.join(','),
        },
      });

      const data = res.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGasPrices = async (apiUrl, networks) => {
    try {
      const requests = Promise.all(
        networks.map(async ({ network }) => {
          const gasPriceResponse = await axios.get(`${apiUrl}/gas-prices`, {
            params: { network, api_key: API_KEY },
          });

          const data = gasPriceResponse.data;

          return data;
        })
      );

      let data = await requests;

      return data;

    } catch (e) {
      console.log(e);
    }
  };

  const gasPrices = await fetchGasPrices(API_URL, networks);
  const fiatRates = await fetchFiatRates();

  // console.log(gasPrices);
  // console.log(fiatRates);

  let networkPrices = networks.map((network, index) => {
    const gasPrice = gasPrices[index]

    const tokenPrice = fiatRates[network.coinGeckoId];

    return {
      ...network,
      gasPrice,
      tokenPrice,
    };
  });

  // console.log(networkPrices);

  return {
    props: {
      fiatRates,
      activeCurrency: 'USD',
      networkPrices,
      currencies
    },
    revalidate: 10, // In seconds
  };
}

GasFeesCalculator.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  );
};
