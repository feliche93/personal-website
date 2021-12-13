import React from 'react';
import Layout from '../../components/layout/Layout';
import WebsiteLayout from '../../components/layout/WebsiteLayout';
import { NextSeo } from 'next-seo';
import { portfolio } from '../../components/portfolio/GridList';
import DetailPortfolio from '../../components/portfolio/DetailPortfolio';

export default function Project({ project }) {
    // console.log(project)
    return (
        <>
            <NextSeo
                title={project.name}
                description={project.seoDescription}
                openGraph={{
                    title: project.title,
                    description: project.seoDescription,
                    url: `https://www.cryptoneur.xyz${project.href}`,
                    images: [
                        {
                            url: `https://www.cryptoneur.xyz${project.coverImage}`,
                            alt: project.title
                        }
                    ],
                }}
            />
            <DetailPortfolio project={project} />
        </>
    )
}

Project.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    )
}

export async function getStaticProps(context) {

    const { slug } = context.params
    const project = portfolio.find(project => project.href.split('/')[2] === slug)

    return {
        props: {
            project
        }
    }
}

export const getStaticPaths = async () => {
    const paths = portfolio.map(project => ({ params: { slug: project.href.split('/')[2] } }))
    return { paths, fallback: false }
}


