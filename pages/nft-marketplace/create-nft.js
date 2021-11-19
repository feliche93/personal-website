import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'Web3Modal'

import React from 'react'
import Layout from '../../components/layout/Lyout'
import NestedLayout from '../../components/layout/NestedLayout'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

function CreateNft() {
    return (
        <div>
            <h1>Create NFT</h1>
        </div>
    )
}

export default CreateNft

CreateNft.getLayout = function getLayout(page) {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    )
  }