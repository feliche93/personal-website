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

const listOfCurrencies = [ 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'JPY', 'SEK', 'NOK', 'DKK', 'HKD', 'SGD', 'THB']

const prices = [
    { name: 'Standard', price: '40' },
    { name: 'Fast', price: '80' },
    { name: 'Instant', price: '160' },
]

export default function test() {

    // STATE
    const [selectedCurrency, setSelectedCurrency] = useState([])
    const [selectedGasPrice, setSelectedGasPrice] = useState([])
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
            const element = {"name" : key, "value": value}
            currencies.push(element)
          });

        const filteredCurrencies = currencies.filter(currency => listOfCurrencies.includes(currency.name))
        setSelectedCurrency(filteredCurrencies[0])

        return filteredCurrencies
    }

    const fetchGasPrices = async (url, params) => {
        const response = await axios.get(url, { params: { ...params, api_key: API_KEY } })
        const data = response.data

        const prices = new Array()

        Object.entries(data).forEach(([key, value]) => {
            const element = {"name": key, "price": value}
            prices.push(element)
          });

        setSelectedGasPrice(prices[0])

        return prices
    }

    // Data
    const { data: fiatRates, isLoading: isLoadingFiatRates, isError: isErrorFiatRates } = useFiatRates()


    function useFiatRates(params = {}) {
        const url = `${API_URL}/fiat-rates`
        const { data, error } = useSWR([url, params], fetchFiatRates)

        return {
            data,
            isLoading: !error && !data,
            isError: error
        }
    }

    function useGasPrices(params) {
        const url = `${API_URL}/gas-price`
        const { data, error } = useSWR([url, { ...params, eip1559: true }], fetchGasPrices)

        return {
            data,
            isLoading: !error && !data,
            isError: error
        }
    }

    const { data: gasPrices, isLoading: isLoadingGasPrices, isError: isErrorGasPrices } = useGasPrices({ 'network': 'polygon' })



    if (isLoadingFiatRates) return <LoadingSpinner />
    if (isErrorFiatRates) return <h1>Error</h1>

    if (isLoadingGasPrices) return <LoadingSpinner />
    if (isErrorGasPrices) return <h1>Error</h1>

    return (

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <FeesForm>
                <FeesFormCard
                    title="Local Currency"
                    description="Select the currency you want the fees to be displayed in"
                >
                    <CurrencyInput
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
                        prices={gasPrices}
                    />
                </FeesFormCard>
            </FeesForm>
            <Table/>
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