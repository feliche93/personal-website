import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import LoadingSpinner from '../LoadingSpinner'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CurrencyInput({
  selectedCurrency,
  setSelectedCurrency,
  currencies,
  isLoadingFiatRates
}) {

  return (
    <>
      <div className="col-span-1 sm:col-span-1">
        <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Currency</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="block truncate">{selectedCurrency}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {isLoadingFiatRates ?
                      <LoadingSpinner />
                      :
                      (currencies.map((currency) => (
                        <Listbox.Option
                          key={currency}
                          className={({ active }) =>
                            classNames(
                              active ? 'text-white bg-blue-600' : 'text-gray-900',
                              'cursor-default select-none relative py-2 pl-8 pr-4'
                            )
                          }
                          value={currency}
                        >
                          {({ selectedCurrency, active }) => (
                            <>
                              <span className={classNames(selectedCurrency ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {currency}
                              </span>
                              {selectedCurrency ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-blue-600',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))
                      )}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </>
  )
}