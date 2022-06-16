import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';
import Hero from '../components/Hero'
import Skills from '../components/Skills';
import CompanyCloud from '../components/CompanyCloud';
import Calendar from '../components/Calendar';

export default function Page() {
  return (
    <>
      <NextSeo
        title="Home"
      />
      <Hero />
      <Calendar />
      <Skills />
      <CompanyCloud />
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