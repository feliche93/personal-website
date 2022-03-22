import { ShareButtons } from './../components/ShareButtons';
import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import useSWR from 'swr'
import axios from 'axios'
import FeesForm from '../components/fees-calculator/FeesForm'
import FeesFormCard from '../components/fees-calculator/FeesFormCard'
import CurrencyInput from '../components/fees-calculator/CurrencyInput'
import { useState } from 'react'
import UsedGasInput from '../components/fees-calculator/UsedGasInput'
import GasPriceRadio from '../components/fees-calculator/GasPriceRadio'
import Table from '../components/fees-calculator/Table'
import { NextSeo } from 'next-seo'


const listOfCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'TRY', 'BRL', 'TWD', 'DKK', 'PLN', 'THB', 'IDR', 'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 'AED', 'COP', 'SAR', 'MYR', 'RON']

export default function GasFeesCalculator() {

  const networks = [
    {
      network: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      website: 'https://ethereum.org/',
      image: '/networks/ethereum_logo.png',
      type: 'Layer 1',
    },
    {
      network: 'arbitrum',
      symbol: 'ETH',
      name: 'Arbitrum One',
      website: 'https://offchainlabs.com/',
      image: '/networks/arbitrum_one_logo.jpeg',
      type: 'Layer 2',
    },
    // {
    //     network: 'Optimism',
    //     symbol: 'ETH',
    //     name: 'optimism',
    //     website: 'https://optimism.io/',
    //     image: '/networks/optimism_logo.png',
    //     type: 'Layer 2',
    // },
    {
      network: 'binance-smart-chain',
      symbol: 'BNB',
      name: 'Binance Smart Chain',
      website: 'https://www.binance.org/en/smartChain',
      image: '/networks/binance_smart_chain_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'avalanche',
      name: 'Avalanche',
      symbol: 'AVAX',
      website: 'https://www.avax.network/',
      image: '/networks/avalanche_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      website: 'https://hermez.io/',
      image: '/networks/polygon_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'fantom',
      symbol: 'FTM',
      name: 'fantom',
      website: 'https://fantom.foundation/',
      image: '/networks/fantom_logo.png',
      type: 'Sidechain',
    },
    {
      network: 'harmony',
      symbol: 'ONE',
      name: 'Harmony',
      website: 'https://www.harmony.one/',
      image: '/networks/harmony_logo.png',
      type: 'Sidechain',
    }
  ]

  // STATE
  const [selectedCurrency, setSelectedCurrency] = useState([])
  const [selectedGasPrice, setSelectedGasPrice] = useState('standard')
  const [tableNetworkPrices, setTableNetworkPrices] = useState([])
  const [usedGas, setUsedGas] = useState(21000)

  const API_KEY = process.env.NEXT_PUBLIC_ZAPPER_API_KEY
  const API_URL = 'https://api.zapper.fi/v1'

  const fetchFiatRates = async (url, params) => {
    const response = await axios.get(url, { params: { ...params, api_key: API_KEY } })
    const data = response.data

    let currencies = new Array()

    Object.entries(data).forEach(([key, value]) => {
      const element = { "name": key, "value": value }
      currencies.push(element)
    });

    const filteredCurrencies = currencies.filter(currency => listOfCurrencies.includes(currency.name))
    // Change the default currency
    setSelectedCurrency(filteredCurrencies.find(currency => currency.name === 'USD'))

    return filteredCurrencies
  }

  function useFiatRates(params = {}) {
    const url = `${API_URL}/fiat-rates`
    const { data, error } = useSWR([url, params], fetchFiatRates)

    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
  }

  const fetchNetworkPrices = async (apiUrl, networks) => {

    try {

      const requests = Promise.all(networks.map(async network => {
        const gasPriceResponse = await axios.get(`${apiUrl}/gas-price`, { params: { ...network, api_key: API_KEY } })
        const tokenPriceResponse = await axios.get(`${apiUrl}/prices`, { params: { ...network, api_key: API_KEY } })

        const gasPriceData = gasPriceResponse.data
        const tokenPriceData = tokenPriceResponse.data

        return {
          gasPriceData, tokenPriceData
        }
      }));

      const data = await requests;

      const cleanedData = networks.map((network, index) => {

        const gasPrices = data[index].gasPriceData
        const [tokenPrice] = data[index].tokenPriceData.filter(token => token.symbol === network.symbol)

        return {
          ...network,
          gasPrices,
          tokenPrice,
        }
      })

      setTableNetworkPrices(cleanedData);

      return cleanedData

    } catch (error) {
      console.log(error)
    }
  }

  function useNetworkPrices(networks) {
    const { data, error } = useSWR([API_URL, networks], fetchNetworkPrices)

    return {
      data,
      isLoading: !error && !data,
      isError: error
    }
  }

  const { data: fiatRates, isLoading: isLoadingFiatRates, isError: isErrorFiatRates } = useFiatRates()
  const { data: networkPrices, isLoading: isLoadingnetworkPrices, isError: isErrorNetworkPrices } = useNetworkPrices(networks)


  return (
    <>
      <NextSeo
        title="Gas Fees Calculator (Multi Currency, Network & Txn Types)"
        description="Calculate gas fees in your local currency for diferent transaction types on Mainnet, Arbitrum, Binance Smart Chain, Avalanche, Polygon, Fantom and Harmony."
        openGraph={{
          url: 'https://www.url.ie/a',
          title: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
          description: 'Calculate gas fees in your local currency for diferent transaction types on Mainnet, Arbitrum, Binance Smart Chain, Avalanche, Polygon, Fantom and Harmony.',
          images: [
            {
              url: 'https://www.cryptoneur.xyz/screenshots/gas-fees-calculator-screenshot.png',
              width: 1928,
              height: 906,
              alt: 'Gas Fees Calculator (Multi Currency & Network)',
              type: 'image/jpeg',
            },
          ]
        }}
      />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" >
        <div>
          <div className="max-w-7xl mx-auto px-4 pb-5 sm:pt-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Gas Fees Calculator</h2>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-4xl">
                Sick of Paying too high gas fees?
              </p>
              <p className="max-w-4xl mt-5 mx-auto text-xl text-gray-500">
                Start calculating gas fees for the biggest networks at different transaction speeds in your own local currency for a variety of transcations.
              </p>
            </div>
          </div>
        </div>
        <ShareButtons
          size={38}
          title={'Found the calculator helpful? Share it with others:'}
          shareTitle={'Calculate gas fees in your local currency for diferent transaction types on Mainnet, Arbitrum, Binance Smart Chain, Avalanche, Polygon, Fantom and Harmony.'}
          shareUrl={'https://www.cryptoneur.xyz/gas-fees-calculator'}
        />
        <FeesForm>
          <FeesFormCard
            title="Local Currency"
            description="Select the currency you want the fees to be displayed in."
          >
            <CurrencyInput
              isLoadingFiatRates={isLoadingFiatRates}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              currencies={fiatRates}
            />
          </FeesFormCard>
          <FeesFormCard
            title="Used Gas"
            description="Every transaction uses gas. Pick a common transaction type or enter a custom amount of gas used."
          >
            <UsedGasInput
              usedGas={usedGas}
              setUsedGas={setUsedGas}
            />
          </FeesFormCard>
          <FeesFormCard
            title="Gas Price"
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
          tableNetworkPrices={tableNetworkPrices}
          isLoadingFiatRates={isLoadingFiatRates}
          isLoadingNetworkPrices={isLoadingnetworkPrices}
        />
        <div className='mt-10 flex items-center  justify-center'>
          <a href="https://zapper.fi/" target="_blank">
            <img className="object-center" src="/logos/power-zap-black.svg" alt="" />
          </a>
        </div>
      </div>
    </>

  )
}



GasFeesCalculator.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}