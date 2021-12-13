import React from 'react'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment from 'moment'
import Link from 'next/link'

export const portfolio = [
    {
        name: 'Cryptoneur Blog',
        description: 'Built a custsom responsive blog with Next.js, Tailwind CSS and Notion as a Content Management System. The Blog follows best SEO practices using Incremental Static Site Generation for best performance and the next-seo library. All notion blocks have been translated into custom Tailwind components.',
        seoDescription: 'Built an SEO optimized Blog with Tailwind CSS, Next.js (ISSG) and Notion as a Content Management System.',
        skills: [
            'Used Next.js incremental static site generation via the Notion API for best performance',
            'Translated Notion blocks into custom CSS Tailwind components',
            'Optimize SEO with next-seo library',
            'Optimized Twitter embeddings custom created Tailwind CSS component and Twitter API',
        ],
        coverImage: '/portfolio/blog.png',
        frameworks: [{
            image: '/portfolio/next_js_logo.png',
            name: 'Next.js',
            href: 'https://nextjs.org/',
        },
        {
            image: '/portfolio/tailwind_css_logo.png',
            name: 'Tailwind CSS',
            href: 'https://tailwindcss.com/',
        },
        {
            image: '/portfolio/notion_logo.png',
            name: 'Notion',
            href: 'https://www.notion.so/',
        }],
        tags: ['Next.js', 'Tailwind'],
        date: '2020-12-09',
        demo: 'Demo available',
        href: '/portfolio/blog',
        demoHref: '/blog',
    },
    {
        name: 'Gas Fees Calculator',
        description: "Built a gas fees calculator that allows users to check transactions costs in multiple local currencies for different networks. Compared to other solutions, not only USD but many other leading currencies are supported. This allows users to better anticipate the costs of a transaction. Furthermore, by entering different amounts of gas used e.g. simple transaction vs. Gensosis Safe creation a user is not restricted to one transaction type.",
        seoDescription: "Built a gas fees calculator that allows users to check transactions costs in multiple local currencies for different networks.",
        skills: [
            'Built a simple responsive Tailwind CSS UI',
            'Used the Zapper API to make several aynchronous API calls',
            'Researched and understood different ways of calculating gas fees',
        ],
        coverImage: '/portfolio/gas_fees_calculator.png',
        frameworks: [
            {
                image: '/portfolio/next_js_logo.png',
                name: 'Next.js',
                href: 'https://nextjs.org/',
            },
            {
                image: '/portfolio/tailwind_css_logo.png',
                name: 'Tailwind CSS',
                href: 'https://tailwindcss.com/',
            },
            {
                image: '/portfolio/zapper_fi_logo.png',
                name: 'Zapper',
                href: 'https://zapper.fi/de/dashboard',
            },
        ],
        demoHref: '/gas-fees-calculator',
        tags: ['Web3', 'DeFi', 'Tailwind', 'Next.js'],
        date: '2021-12-05',
        demo: 'Demo available',
        href: '/portfolio/gas-fees-calculator',
    },
    {
        name: 'Developer Dao Genesis Token Mint Dashboard',
        description:
            `Created a Dune Analytics dashboard for the Developer Dao to have a quick overview
            of all metrics for the Genesis Token Mint. The project can be easily adjusted for future token launches
            to monitor an ongoing launch and steer decision making.`,
        seoDescription: "Dune Analytics dashboard for the Developer Dao to have a quick overview of all metrics for the Genesis Token Mint.",
        skills: [
            'Understanding Dune Table Schema',
            'Querying the Ethereum blockchain',
            'Going from Etherscan Info to calculated SQL metrics',
            'Calculated Gas Fees and other financial metrics from scratch',
            'Showed best practices for dashboard design with adjustable filters and explantory sections',

        ],
        coverImage: '/portfolio/dune_analytics_dashboard_demo.png',
        frameworks: [
            {
                image: '/portfolio/dune_analytics_logo.png',
                name: 'Dune Analytics',
                href: 'https://dune.xyz/home',
            },
        ],
        demoHref: 'https://dune.xyz/feliche93/Developer-DAO',
        tags: ['Web3', 'Dune Analytics'],
        date: '2020-01-07',
        demo: 'Demo available',
        href: '/portfolio/developer-dao-nft-dashboard',
    },

]

export const tagColors = {
    "Web3":
    {
        bgColorClass: `bg-sky-100`,
        textColorClass: `text-sky-800`
    },
    "DeFi":
    {
        bgColorClass: `bg-amber-100`,
        textColorClass: `text-amber-800`
    },
    "Dune Analytics":
    {
        bgColorClass: "bg-green-100",
        textColorClass: "text-green-800"
    },
    "Next.js":
    {
        bgColorClass: "bg-green-100",
        textColorClass: "text-green-800"
    },
    "Tailwind":
    {
        bgColorClass: `bg-blue-100`,
        textColorClass: `text-blue-800`
    },
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GridList() {
    console.log(portfolio)
    console.log(tagColors)
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {portfolio.map((project) => (
                    <Link key={project.href} href={project.href}>
                        <a className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-blue-600 truncate">{project.name}</p>
                                            <div className='space-x-2'>
                                                {project.tags.map((tag) => (
                                                    <span span key={tag}
                                                        className={
                                                            classNames(
                                                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                                // "bg-green-500",
                                                                tagColors[tag].bgColorClass,
                                                                // tagColors[tag].textColorClass
                                                            )}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Completed on <time dateTime={project.date}>{moment(project.date).format('MMMM Do YYYY')}</time>
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                    {project.demo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </ul>
        </div >
    )
}

