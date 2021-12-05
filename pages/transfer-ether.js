import React from 'react'
import Table from '../components/Table'
import SectionHeader from '../components/SectionHeader'
import { ethers } from "ethers";

export default function WalletToWallet(props) {
    const { networks } = props;
    return (
        <>
            <SectionHeader header="Transfer Ether" />
            <Table networks={networks} />
        </>
    )
}

export async function getStaticProps() {

    const ETERUM_MAINNET = process.env.ETHERUM_MAINNET;

    const provider = new ethers.providers.JsonRpcProvider(ETERUM_MAINNET);

    let gasPrice = await provider.getGasPrice();
    let gasUsed = 21000
    let EthereumEurPrice = 3668.40
    gasPrice = parseFloat(ethers.utils.formatEther(gasPrice)) * gasUsed
    let gasPriceEur = gasPrice * EthereumEurPrice

    const networks = [
        {
            name: 'Etherum',
            website: 'https://ethereum.org/',
            image: '/etherum_logo.png',
            type: 'Layer 1',
            gasUsed,
            gasPrice,
            gasPriceEur,
            currentCost: gasPriceEur
        },
        // {
        //   name: 'Polygon Hermez',
        //   website: 'https://hermez.io/',
        //   image: '/hermez_logo.png',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },
        // {
        //   name: 'ZKSync',
        //   website: 'https://zksync.io/',
        //   image: '/zksync_logo.png',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },
        // {
        //   name: 'Loopring',
        //   website: 'https://loopring.io/',
        //   image: '/loopring_logo.png',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },
        // {
        //   name: 'Arbitrum One',
        //   website: 'https://offchainlabs.com/',
        //   image: '/arbitrum_one_logo.jpeg',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },
        // {
        //   name: 'Optimism',
        //   website: 'https://optimism.io/',
        //   image: '/optimism_logo.png',
        //   type: 'Layer 2',
        //   currentCost: '$ 11.49'
        // },
    ]

    return {
        props: {
            networks
        },
        revalidate: 10, // In seconds
    }

}