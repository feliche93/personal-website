import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import LoadingSpinner from '../components/LoadingSpinner'
import useSWR from 'swr'
import axios from 'axios'
import FeesForm from '../components/fees-calculator/FeesForm'
import FeesFormCard from '../components/fees-calculator/FeesFormCard'
import CurrencyInput from '../components/fees-calculator/CurrencyInput'
import { useState } from 'react'
import UsedGasInput from '../components/fees-calculator/UsedGasInput'
import GasPriceRadio from '../components/fees-calculator/GasPriceRadio'
import Table from '../components/fees-calculator/Table'

const listOfCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'JPY', 'SEK', 'NOK', 'DKK', 'HKD', 'SGD', 'THB']

export default function test() {

    const networks = [
        {
            network: 'ethereum',
            symbol: 'ETH',
            name: 'Etherum',
            website: 'https://ethereum.org/',
            image: '/networks/etherum_logo.png',
            type: 'Layer 1',
            currentCost: '$ 11.49'
        },
        {
            network: 'polygon',
            name: 'Polygon',
            symbol: 'MATIC',
            website: 'https://hermez.io/',
            image: '/networks/polygon_logo.png',
            type: 'Sidechain',
            currentCost: '$ 11.49'
        },
        {
            network: 'avalanche',
            name: 'Avalanche',
            symbol: 'AVAX',
            website: 'https://www.avax.network/',
            image: '/networks/avalanche_logo.png',
            type: 'Sidechain',
            currentCost: '$ 11.49'
        },
        {
            network: 'arbitrum',
            symbol: 'ETH',
            name: 'Arbitrum One',
            website: 'https://offchainlabs.com/',
            image: '/networks/arbitrum_one_logo.jpeg',
            type: 'Layer 2',
            currentCost: '$ 11.49'
        },
        // {
        //   name: 'ZKSync',
        //   website: 'https://zksync.io/',
        //   image: '/networks/zksync_logo.png',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },
        // {
        //   name: 'Loopring',
        //   website: 'https://loopring.io/',
        //   image: '/networks/loopring_logo.png',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },

        // {
        //     name: 'Optimism',
        //     website: 'https://optimism.io/',
        //     image: '/networks/optimism_logo.png',
        //     type: 'Layer 2',
        //     currentCost: '$ 11.49'
        // },
    ]

    // STATE
    const [selectedCurrency, setSelectedCurrency] = useState([])
    const [selectedGasPrice, setSelectedGasPrice] = useState('standard')
    const [tableNetworkPrices, setTableNetworkPrices] = useState([])
    const [usedGas, setUsedGas] = useState(21000)
    // const [gasPrice, setGasPrice] = useState(120)
    const ethPrice = 4121.91

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
        setSelectedCurrency(filteredCurrencies[0])

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
                const tokenListResponse = await axios.get(`${apiUrl}/token-list`, { params: { api_key: API_KEY } })

                const gasPriceData = gasPriceResponse.data
                const tokenPriceData = tokenPriceResponse.data
                const tokenListResponseData = tokenListResponse.data.tokens

                return { gasPriceData, tokenPriceData, tokenListResponseData }
            }));

            const data = await requests;
            console.log("TokenReponse Data")
            console.log(data)

            const cleanedData = networks.map((network, index) => {

                const [token] = data[index].tokenListResponseData.filter(token => token.symbol === network.symbol)
                const gasPrices = data[index].gasPriceData
                const [tokenPrice] = data[index].tokenPriceData.filter(token => token.symbol === network.symbol)

                return {
                    ...network,
                    token,
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

    console.log(networkPrices);

    // if (isLoadingFiatRates && isLoadingnetworkPrices) return <LoadingSpinner />
    // if (isErrorFiatRates && isErrorNetworkPrices) return <h1>Error</h1>

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <FeesForm>
                <FeesFormCard
                    title="Local Currency"
                    description="Select the currency you want the fees to be displayed in"
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
                    description="Every transaction uses gas. Please enter amount of gas used in the transaction."
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
            <br></br>
            <br></br>
            {/* <h2>Fiat Price: {fiatRates[selectedCurrency.name]} {selectedCurrency.name}</h2>
            <h2>Used Gase: {usedGas}</h2>
            <h2>Gas Price: {gasPrice}</h2>
            <h2>ETH Price: {ethPrice}</h2>
            <h2>Total Fee: {(usedGas * gasPrice * ethPrice / 10**9 * fiatRates[selectedCurrency.name]).toFixed(2)} {selectedCurrency.name}</h2> */}
        </div>
    )
}



test.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    )
}