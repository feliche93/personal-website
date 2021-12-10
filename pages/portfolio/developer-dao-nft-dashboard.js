import React from 'react'
import Layout from '../../components/layout/Layout'
import WebsiteLayout from '../../components/layout/WebsiteLayout'
import { NextSeo } from 'next-seo';
import { portfolio } from '../../components/portfolio/GridList'
import { useRouter } from 'next/router'
import DetailPortfolio from '../../components/portfolio/DetailPortfolio';



export default function DeveloperDaoDashboard() {

    const router = useRouter()
    const { slug } = router.query
    const project = portfolio.find(project => project.href === router.pathname)

    return (
        <DetailPortfolio project={project} />
    )
}

DeveloperDaoDashboard.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    )
}

// export const getStaticPaths = async () => {
//     const paths = portfolio.map(project => ({ params: { slug: project.href.split('/')[2] } }))
//     return { paths, fallback: false }
// }


