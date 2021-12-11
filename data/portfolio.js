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
