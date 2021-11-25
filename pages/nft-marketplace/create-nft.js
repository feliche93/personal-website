import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

import React from 'react'
import Layout from '../../components/layout/Layout'
import NestedLayout from '../../components/layout/NestedLayout'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import { nftaddress, nftmarketaddress } from '../../.config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

function CreateNft() {

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      {
        progress: (prog) => console.log(`received: ${prog}`)
      }
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (e) {
      console.log(e)
    }
  }

  async function createNft() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) {
      return
    }
    const data = JSON.stringify({
      name, description, image: fileUrl,
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/nft-marketplace')
  }

  return (
    <div className="pt-20 p-5">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create your NFT</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This form will create your NFT and store the media as well as Metadata on IFPS.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="assset-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Asset Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
                    type="text"
                    name="assset-name"
                    id="assset-name"
                    placeholder="Asset Name"
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Description
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
                    id="description"
                    name="description"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                  />
                  <p className="mt-2 text-sm text-gray-500">Write a few sentences about your Digital Asset.</p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="asset-price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Asset Price
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      MATIC
                    </span>
                    <input
                      onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
                      name="asset-price"
                      id="asset-price"
                      placeholder="100"
                      className="pl-2 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 border rounded-none rounded-r-md sm:text-sm border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="asset-file" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  File
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  {!fileUrl ? (
                  <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={onChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  ) : (
                    <img className="rounded mt-4" width="350" src={fileUrl} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={createNft}
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNft

CreateNft.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )

}