import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'

export default function Page() {
  return (
    <h1>Hello world</h1>
    )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}