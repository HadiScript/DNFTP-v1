//@ts-nocheck

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useAccount, useListedNfts, useNetwork } from "hooks/web3";
import type { NextPage } from "next";
import { useEffect } from "react";
import { BaseLayout, NftList } from "../components";

const Home: NextPage = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  let account2 = account.data;

  let account3 = account2;

  console.log(network.isConnetedToNetwork, "network")
  console.log(account3, "account3")

  const signedUser = async () => {
    const userAccount = account.data;
    try {
      const res = await axios.post(`http://localhost:8000/api/sign-user`, {
        account: userAccount,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (account && account.data) {
      signedUser();
    }
  }, [account && account.data]);

  return (
    <BaseLayout>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              {/* {"0x95b54FF5D771685b5c70C91d140e2a64c0B66e6a" === account.data ? "works :)" : "no :("} */}
              Amazing Creatures NFTs
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          {network.isConnetedToNetwork ? (
          //  <p>connected</p>
           <NftList />
          ) : (
            <div className="rounded-md bg-yellow-50 p-4 mt-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Attention needed
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      {network.isLoading
                        ? "Loading..."
                        : `Connect to ${network.targetNetwork}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
