import React, { useState } from 'react'
import Layout from '../../components/layout/Layout';
import WebsiteLayout from '../../components/layout/WebsiteLayout';
import { useForm } from "react-hook-form";
import { ethers } from 'ethers';
import Blockies from 'react-blockies';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Web3Journey({ wallets }) {

    // const router = useRouter();
    // const query = router.query;
    // const wallets = query.wallets.split(',');

    // console.log(wallets);

    return (
        <div className="">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="inline text-3xl font-extrabold tracking-tight text-gray-900 sm:block sm:text-4xl">
                    {wallets.map((wallet) => (
                        <p>{wallet}</p>
                    ))}
                    {/* Wallets: {JSON.stringify(query.wallets)} */}

                </h2>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const query = context.query;
    const wallets = query.wallets.split(',');

    console.log(wallets);

    return {
        props: {
            wallets
        }
    };
}

Web3Journey.getLayout = function getLayout(page) {
    return (
        <Layout>
            <WebsiteLayout>{page}</WebsiteLayout>
        </Layout>
    );
};
