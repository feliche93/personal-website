import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ChatIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import ConnectWallet from '../ConnectWallet'

const navigation = [
  { name: 'Home', href: '/ama', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function AMALayout(props) {
  return (
    <div className="relative bg-gray-50 overflow-hidden min-h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link
                    href="/ama">
                    <a >
                      <div className="flex flex-row justify-center items-center">
                        <ChatIcon className="h-10 w-10 text-blue-600" />
                        <span className="sr-only">Web 3 AMA</span>
                        <span className="pl-2 text-left text-xl sm:text-2xl text-blue-600 font-mono tracking-tight" >Web3 AMA</span>
                      </div>
                    </a>
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a className="font-medium text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span className="inline-flex rounded-md shadow">
                  <ConnectWallet type="desktop" />
                </span>
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
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className="flex flex-row justify-center items-center">
                    <ChatIcon className="h-10 w-10 text-blue-600" />
                    <span className="sr-only">Web 3 AMA</span>
                    <span className="pl-2 text-left text-xl sm:text-2xl text-blue-800 font-mono tracking-tight" >Web3 AMA</span>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <ConnectWallet type="mobile" />
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        {props.children}
      </div>
    </div>
  )
}

export default AMALayout
