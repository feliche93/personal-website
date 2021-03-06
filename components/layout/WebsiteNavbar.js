import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import Image from 'next/image'

// TODO: Check active links working
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Gas Fee Caculator', href: '/gas-fees-calculator' },
  { name: 'Blog', href: '/blog' },
  { name: 'Portfolio', href: '/portfolio' },
  // { name: 'Freelancing', href: '/freelancing' },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function WebsiteNavbar() {

  const router = useRouter()

  return (
    <div className="relative bg-gray-100 sm:overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24 bg-gray-100">
        <Popover>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a>
                      <span className="sr-only">Workflow</span>
                      <div className="flex items-center">
                        <Image
                          //layout="fill"
                          width={60}
                          height={60}
                          className="object-contain"
                          src="/logo_transparent.png"
                          alt="Cryptoneur Logo"
                        />
                        <span className="text-gray-600 text-xl pl-1 font-mono">Cryptoneur</span>
                      </div>

                    </a>
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                  >
                    <a

                      className={classNames(
                        item.href === router.pathname ? 'text-black' : '',
                        'font-medium text-gray-600 hover:text-gray-900'
                      )}>
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                {/*
                TODO: Potentially add login button
                <span className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100"
                  >
                    Log in
                  </a>
                </span>
                */}
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <Image
                      //layout="fill"
                      width={50}
                      height={50}
                      className="object-contain"
                      src="/logo_transparent.png"
                      alt="Cryptoneur Logo"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                    >
                      <a
                        className={classNames(
                          item.href === router.pathname ? 'text-black' : '',
                          'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100')}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>


                {/* TODO: Potentially add login button
                <a
                  href="#"
                  className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-100 hover:bg-gray-100"
                >
                  Log in
                </a> */}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div >
  )
}

export default WebsiteNavbar
