import Link from 'next/link';

const navigation = [
    { name: 'Home', href: '/nft-marketplace' },
    { name: 'Dashboard', href: '/nft-marketplace/dashboard' },
    { name: 'Sell NFT', href: '/nft-marketplace/create-nft' },
    { name: 'My NFTs', href: '/nft-marketplace/my-nfts' },
]

export default function Header() {
    return (
        <header className="bg-indigo-600">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <Link href="/nft-marketplace">
                            <a>
                                <span className="sr-only">Metaverse Marketplace</span>
                                <span className="text-left text-xl sm:text-2xl text-white font-mono tracking-tighter" >Metaverse Marketplace</span>
                            </a>
                        </Link>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            {navigation.map((link) => (
                                <Link href={link.href}>
                                    <a key={link.name} className="text-base font-medium text-white hover:text-indigo-50">
                                        {link.name}
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        <a
                            href="#"
                            className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                            Connect Wallet
                        </a>
                    </div>
                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map((link) => (
                        <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    )
}