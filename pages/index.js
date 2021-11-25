import Layout from '../components/layout/Layout'
import NestedLayout from '../components/layout/NestedLayout'

export default function Page() {
  return (
    <h1>Hello world</h1>
    )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}