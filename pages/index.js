import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import Hero from '../components/Hero'
export default function Page() {
  return (
    <Hero/>
    )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}