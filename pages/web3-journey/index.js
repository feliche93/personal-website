import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import WebsiteLayout from '../../components/layout/WebsiteLayout';
import { useForm } from "react-hook-form";
import { ethers } from 'ethers';
import Blockies from 'react-blockies';
import Link from 'next/link';


export default function Web3Journey() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);

        setWallets([...wallets, data.walletAddress])
        reset();

    };
    const [wallets, setWallets] = useState([]);
    console.log('Errors ', errors);
    console.log('Wallets ', wallets);

    return (
        <div className="">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="inline text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl">
                    Want to learn about your Web3 journey?
                </h2>
                <p className="inline text-3xl font-extrabold tracking-tight text-blue-600 sm:block sm:text-4xl">
                    Paste in your wallet adresses to get started...
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:flex">
                    <label htmlFor="email-address" className="sr-only">
                        Wallet Address
                    </label>
                    <input
                        {...register("walletAddress", {
                            required: 'Please enter a wallet address', // JS only: <p>error message</p> TS only support string,
                            validate: {
                                validAddress: address => ethers.utils.isAddress(address) || "Invalid wallet address"
                            },
                            validate: {
                                addressNotDuplicated: address => !wallets.includes(address) || "Wallet address already added"
                            }
                        })}

                        type="text"
                        className="w-full px-5 py-3 text-sm placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs border-gray-300 rounded-md"
                        placeholder="0xA7828C5BAb02C879Ceb555F567d1833b34E1402B"
                    />
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Wallet Address
                        </button>
                    </div>
                </form>
                {wallets.length > 0 && (
                    <>
                        <div className='pt-16 max-w-fit'>
                            <h3 className=' font-semibold text-xl'>Added Wallets:</h3>
                            <ul role="list" className="divide-y divide-gray-200">
                                {wallets.map((wallet) => (
                                    <li key={wallet} className="py-4 flex">
                                        <Blockies
                                            seed={wallet}
                                            size={12}
                                            scale={3}
                                            className="rounded-full"
                                        />
                                        {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
                                        <div className="ml-3">
                                            <p className="text-sm text-clip font-medium text-gray-900">{wallet.slice(0, 6)}...{wallet.slice(wallet.length - 6, wallet.length)}</p>
                                            {/* <p className="text-sm text-gray-500">{wallet}</p> */}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Link href={{
                                pathname: '/web3-journey/[wallets]',
                                query: { wallets: wallets }
                            }}>
                                <a
                                    onClick={() => setWallets([])}
                                    type="submit"
                                    className="w-full sm:w-fit px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Show my Journey
                                </a>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>)
}


Web3Journey.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    );
};
