import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Web3Modal from 'Web3Modal'

import { nftaddress, nftmarketaddress } from '../../.config'

import Layout from '../../components/layout/Lyout'
import NestedLayout from '../../components/layout/NestedLayout'

export default function Page() {
  return (
    <h1>Home</h1>
    )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}