import React from 'react'
import Layout from '../../components/layout/Lyout'
import NestedLayout from '../../components/layout/NestedLayout'


function Page() {
    return (
        <div>
            <h1>My NFTs</h1>
        </div>
    )
}

export default Page

Page.getLayout = function getLayout(page) {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    )
  }