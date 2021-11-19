import React from 'react'
import Layout from '../../components/layout/Lyout'
import NestedLayout from '../../components/layout/NestedLayout'


function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard

Dashboard.getLayout = function getLayout(page) {
    return (
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    )
  }