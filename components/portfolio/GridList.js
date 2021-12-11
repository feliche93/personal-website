import React from 'react'
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import moment from 'moment'
import Link from 'next/link'

export const portfolio = [
    // {
    //     name: 'Cryptoneur Blog',
    //     tags: ['Next.js', 'Tailwind'],
    //     date: '2020-12-09',
    //     demo: 'Demo available',
    //     href: '/portfolio/developer-dao-nft-dashboard',
    // },
    // {
    //     name: 'Gas Fees Calculator',
    //     tags: ['Web3', 'DeFi', 'Tailwind', 'Next.js'],
    //     date: '2021-12-05',
    //     demo: 'Demo available',
    //     href: '/portfolio/gas-fees-calculator',
    // },
    {
        name: 'Developer Dao Genesis Token Mint Dashboard',
        description:
            `Created a Dune Analytics dashboard for the Developer Dao to have a quick overview
            of all metrics for the Genesis Token Mint. The project can be easily adjusted for future token launches
            to monitor ongoing launch and steer decision making.`,
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
        bgColorClass: "bg-red-100",
        textColorClass: "text-red-800"
    },
    "DeFi":
    {
        bgColorClass: "bg-blue-100",
        textColorClass: "text-blue-800"
    },
    "Dune Analytics":
    {
        bgColorClass: "bg-yellow-100",
        textColorClass: "text-yellow-800"
    },
    "Next.js":
    {
        bgColorClass: "bg-green-100",
        textColorClass: "text-green-800"
    },
    "Tailwind":
    {
        bgColorClass: "bg-blue-100",
        textColorClass: "text-blue-800"
    },
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GridList() {
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
                                                    <span key={tag} className={
                                                        classNames(
                                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                            tagColors[tag].bgColorClass,
                                                            tagColors[tag].bgTextColorClass
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
        </div>
    )
}

