import Layout from '../../components/layout/Layout'
import WebsiteLayout from '../../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';
import GridList from '../../components/portfolio/GridList';

export default function index() {
    return (
        <GridList/>
    )
}

index.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    )
}