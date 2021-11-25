import React from 'react'
import Layout from '../../components/layout/Layout'
import NestedLayout from '../../components/layout/NestedLayout'


function MyNfts() {
    return (
        <div>
            <h1>My NFTs</h1>
        </div>
    )
}

export default MyNfts

MyNfts.getLayout = function getLayout(page) {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    )
  }