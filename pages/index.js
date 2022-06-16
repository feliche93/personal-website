import Layout from '../components/layout/Layout'
import WebsiteLayout from '../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';
import Hero from '../components/Hero'
import Skills from '../components/Skills';
import CompanyCloud from '../components/CompanyCloud';
import Calendar from '../components/Calendar';
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import dynamic from 'next/dynamic'
import WebsiteStats from '../components/WebsiteStats';

export default function Page(
  {
    activeUsers30DaysData,
    activeUsersData,
    averageSessionDuration30DaysData,
  }
) {

  console.log(activeUsers30DaysData)

  return (
    <>
      <NextSeo
        title="Home"
      />
      <Hero />
      <Calendar />
      <Skills />
      <CompanyCloud />
      <WebsiteStats
        activeUsers30DaysData={activeUsers30DaysData}
        activeUsersData={activeUsersData}
        averageSessionDuration30DaysData={averageSessionDuration30DaysData}
      />


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

export const getStaticProps = async () => {

  const serviceAccount = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  }

  const analyticsDataClient = new BetaAnalyticsDataClient(
    { credentials: serviceAccount },
  );
  const propertyId = "295633434";

  const activeUsers30Days = {
    dateRanges: [
      {
        startDate: '60daysAgo',
        endDate: '30daysAgo',
        name: 'previous30days',
      },
      {
        startDate: '30daysAgo',
        endDate: 'today',
        name: 'last30days',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  }

  const activeUsers = {
    dateRanges: [
      {
        startDate: '2020-01-01',
        endDate: 'today',
        name: 'lifetime',
      },
    ],
    metrics: [
      {
        name: 'activeUsers',
      },
    ],
  }

  const averageSessionDuration30Days = {
    dateRanges: [
      {
        startDate: '60daysAgo',
        endDate: '30daysAgo',
        name: 'previous30days',
      },
      {
        startDate: '30daysAgo',
        endDate: 'today',
        name: 'last30days',
      },
    ],
    metrics: [
      {
        name: 'averageSessionDuration',
      },
    ],
  }


  async function runReport(query) {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      ...query
    });

    // console.log('Report result:');
    // console.log(response.rows);
    let data = response.rows.map(row => {
      if (row) {
        const name = row.dimensionValues[0] ? row.dimensionValues[0]?.value : row.metricValues[0]?.oneValue;
        const value = parseInt(row.metricValues[0]?.value);
        return { name, value };
      }
    });


    data.length > 1 ? data.push({ name: 'changePercent', value: (data[0].value - data[1].value) / data[1].value * 100 }) : data.push({ 'change': 0 })
    data.length > 1 ? data.push({ name: 'changeAbsolut', value: (data[0].value - data[1].value) }) : data.push({ 'changeAbsolut': 0 })
    console.log(data);
    return data;
  }

  const [
    activeUsers30DaysData,
    activeUsersData,
    averageSessionDuration30DaysData,
  ] = await Promise.all([
    runReport(activeUsers30Days),
    runReport(activeUsers),
    runReport(averageSessionDuration30Days),
  ])

  return {
    props: {
      activeUsers30DaysData,
      activeUsersData,
      averageSessionDuration30DaysData,
    },
    revalidate: 60 * 60 * 2,
  }

}