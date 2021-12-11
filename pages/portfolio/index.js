import Layout from '../../components/layout/Layout'
import WebsiteLayout from '../../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';
import GridList from '../../components/portfolio/GridList';

export default function index() {
    return (
        <>
            <NextSeo
                title="Portfolio Projects"
                description="Overview of all Web3 and Data Engineering Projects with problems, learned skills and demos."
            />
            <GridList />
        </>
    )
}

index.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    )
}