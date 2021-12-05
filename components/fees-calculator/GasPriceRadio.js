import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GasPriceSelection({selectedGasPrice, setSelectedGasPrice, prices}) {

    return (
        <div className="col-span-3 sm:col-span-2">
            <RadioGroup value={selectedGasPrice} onChange={setSelectedGasPrice}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-4 capitalize">
                    {prices.map((price) => (
                        <RadioGroup.Option
                            key={price.name}
                            value={price}
                            className={({ checked, active }) =>
                                classNames(
                                    checked ? 'border-transparent' : 'border-gray-300',
                                    active ? 'ring-2 ring-blue-500' : '',
                                    'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                                )
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="flex items-center">
                                        <div className="">
                                            <RadioGroup.Label as="p" className="font-medium text-gray-900">
                                                {price.name}
                                            </RadioGroup.Label>

                                        </div>
                                    </div>
                                    <RadioGroup.Description as="div" className="mt-2 sm:mt-0 sm:block sm:ml-4 sm:text-right">
                                        <p className="font-medium text-gray-900">{price.price}  <span className="ml-1 text-gray-500 sm:ml-0">GWEI</span></p>

                                    </RadioGroup.Description>
                                    <div
                                        className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-blue-500' : 'border-transparent',
                                            'absolute -inset-px rounded-lg pointer-events-none'
                                        )}
                                        aria-hidden="true"
                                    />
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}