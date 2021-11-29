import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
  return (

    <main className="pt-16 mx-auto max-w-7xl px-4 sm:pt-10">
      <div className="text-center">
        <Image
          className="object-contain rounded-full"
          width={256}
          height={256}
          src="/felix-vemmer-profile-pic.png"
        />
      </div>
      <div className="text-center pt-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
          <span className="block xl:inline">👋 Welcome to my</span>{' '}
          <span className="block text-blue-600 xl:inline">personal website</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Hey I am Felix, a full-stack Web3 Developer and Data Engineer based in Berlin. Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link href="/portfolio">
            <a

              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Portfolio Projects
            </a>
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link href="/blog">
            <a

              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Blog
            </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
