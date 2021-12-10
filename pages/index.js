import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';
import Hero from '../components/Hero'
import Skills from '../components/Skills';
import CompanyCloud from '../components/CompanyCloud';

export default function Page() {
  return (
    <>
    <NextSeo
      title="Home"
    />
    <Hero/>
    <Skills/>
    <CompanyCloud/>
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