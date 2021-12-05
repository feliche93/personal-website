import Image from 'next/image'
import LoadingSpinner from '../LoadingSpinner'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Table({ tableNetworkPrices, isLoadingFiatRates, isLoadingNetworkPrices, selectedCurrency, usedGas, selectedGasPrice }) {

  console.log(usedGas)

  return (

    <div className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Token
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Gas Used
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Gas Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Current Cost
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableNetworkPrices.map((network) => (
                  <tr key={network.website}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            src={network.image}
                            alt={network.name}
                            width={50}
                            height={50}
                            className="object-contain"
                          >
                          </Image>
                          {/* <img className="h-10 w-10 rounded-full" src={network.image} alt={network.name} /> */}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{network.name}</div>
                          <a href={network.website} target="_blank" className="text-sm text-gray-500">{network.website}</a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={classNames(
                        network.type === "Layer 1" ? "bg-gray-100 text-gray-800" :
                          network.type === "Sidechain" ? "bg-indigo-100 text-indigo-800" :
                            "bg-blue-100 text-blue-800",
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      )}>
                        {network.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isLoadingNetworkPrices ? <h1>Loading</h1> : (
                        <>
                          <div className="text-sm text-gray-900">{network.tokenPrice.symbol}</div>
                          <div className="text-sm text-gray-500">{(network.tokenPrice.price * selectedCurrency.value).toFixed(2)} {selectedCurrency.name}</div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isLoadingNetworkPrices ? <h1>Loading</h1> : (
                        <>
                          <div className="text-sm text-gray-500">{usedGas}</div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isLoadingNetworkPrices ? <h1>Loading</h1> : (
                        <>
                          <div className="text-sm capitalize text-gray-900">{selectedGasPrice}</div>
                          <div className="text-sm text-gray-500">{network.gasPrices[selectedGasPrice]}</div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(
                      network.tokenPrice.price * selectedCurrency.value * usedGas * network.gasPrices[selectedGasPrice] / 10**9

                      ).toFixed(4)} {selectedCurrency.name
                      }</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-indigo-900">
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}