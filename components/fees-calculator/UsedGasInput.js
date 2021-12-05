import React from 'react'

export default function UsedGasInput({ usedGas, setUsedGas }) {
    return (
        <>
            <div className="col-span-3 sm:col-span-2">
                <label htmlFor="gas-input" className="block text-sm font-medium text-gray-700">
                    Used Gas
                </label>
                <input
                    value={usedGas}
                    onChange={(e) => setUsedGas(e.target.value)}
                    type="number"
                    name="gas-input"
                    id="gas-input"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
        </>
    )
}
