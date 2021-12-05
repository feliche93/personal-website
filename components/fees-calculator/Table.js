import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const networks = [
  {
    name: 'Etherum',
    website: 'https://ethereum.org/',
    image: '/networks/etherum_logo.png',
    type: 'Layer 1',
    currentCost: '$ 11.49'
  },
  {
    name: 'Polygon Hermez',
    website: 'https://hermez.io/',
    image: '/networks/hermez_logo.png',
    type: 'Layer 2',
    currentCost: '$ 11.49'
  },
  // {
  //   name: 'ZKSync',
  //   website: 'https://zksync.io/',
  //   image: '/networks/zksync_logo.png',
  //   type: 'Layer 2',
  //   currentCost: '$ 11.49'
  // },
  // {
  //   name: 'Loopring',
  //   website: 'https://loopring.io/',
  //   image: '/networks/loopring_logo.png',
  //   type: 'Layer 2',
  //   currentCost: '$ 11.49'
  // },
  {
    name: 'Arbitrum One',
    website: 'https://offchainlabs.com/',
    image: '/networks/arbitrum_one_logo.jpeg',
    type: 'Layer 2',
    currentCost: '$ 11.49'
  },
  {
    name: 'Optimism',
    website: 'https://optimism.io/',
    image: '/networks/optimism_logo.png',
    type: 'Layer 2',
    currentCost: '$ 11.49'
  },
]


export default function Table() {
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
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                {networks.map((network) => (
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
                          <div className="text-sm text-gray-500">{network.website}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{network.name}</div>
                      <div className="text-sm text-gray-500">{network.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={classNames(
                        network.type == "Layer 1" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800",
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      )}>
                        {network.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{network.currentCost}</td>
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