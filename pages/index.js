import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import Hero from '../components/Hero'
import { NextSeo } from 'next-seo';

export default function Page() {
  return (
    <>
    <NextSeo
      title="Home"
    />
    <Hero/>
    </>
    )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <WebsiteLayout>{page}</WebsiteLayout>
    </Layout>
  )
}