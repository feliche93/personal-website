import React from "react";
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";

// import thirdweb
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import MemberTable from "./MemberTable";
import ActiveProposals from "./ActiveProposals";

export default function DaoWalletConnect() {
  // Use the connectWallet hook thirdweb gives us.
  const { connectWallet, address, error, provider } = useWeb3();
  // console.log("👋 Address:", address);

  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined;

  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);

  // Holds the amount of token each member has in state.
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({});
  // The array holding all of our members addresses.
  const [memberAddresses, setMemberAddresses] = useState([]);

  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // We instatiate the sdk on Rinkeby.
  const sdk = new ThirdwebSDK("rinkeby");

  // We can grab a reference to our ERC-1155 contract.
  const bundleDropModule = sdk.getBundleDropModule(
    "0x5A74ED37E32ce11C3aC81069D5C76DEDB2415816"
  );

  const tokenModule = sdk.getTokenModule(
    "0x537DC5Cf68A9AF12e9589dcD6edDC5cd11C91414"
  );

  const voteModule = sdk.getVoteModule(
    "0x8e98a5BaF94c6d1ddd56Ba7de3E54B57C353884a"
  );

  // This useEffect grabs all our the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0.
    bundleDropModule
      .getAllClaimerAddresses("0")
      .then((addresess) => {
        // console.log("🚀 Members addresses", addresess);
        setMemberAddresses(addresess);
      })
      .catch((err) => {
        console.error("failed to get member list", err);
      });
  }, [hasClaimedNFT]);

  // This useEffect grabs the # of token each member holds.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // Grab all the balances.
    tokenModule
      .getAllHolderBalances()
      .then((amounts) => {
        // console.log("👜 Amounts", amounts);
        setMemberTokenAmounts(amounts);
      })
      .catch((err) => {
        console.error("failed to get token amounts", err);
      });
  }, [hasClaimedNFT]);

  // Retrieve all our existing proposals from the contract.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
    // A simple call to voteModule.getAll() to grab the proposals.
    voteModule
      .getAll()
      .then((proposals) => {
        // Set state!
        setProposals(proposals);
        // console.log("🌈 Proposals:", proposals);
      })
      .catch((err) => {
        console.error("failed to get proposals", err);
      });
  }, [hasClaimedNFT]);

  // We also need to check if the user already voted.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // If we haven't finished retrieving the proposals from the useEffect above
    // then we can't check if the user voted yet!
    if (!proposals.length) {
      return;
    }

    // Check if the user has already voted on the first proposal.
    voteModule
      .hasVoted(proposals[0].proposalId, address)
      .then((hasVoted) => {
        setHasVoted(hasVoted);
        // console.log("🥵 User has already voted");
      })
      .catch((err) => {
        console.error("failed to check if wallet has voted", err);
      });
  }, [hasClaimedNFT, proposals, address]);

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        address,
        tokenAmount: ethers.utils.formatUnits(
          // If the address isn't in memberTokenAmounts, it means they don't
          // hold any of our token.
          memberTokenAmounts[address] || 0,
          18
        ),
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  // Another useEffect!
  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    // Check if the user has the NFT by using bundleDropModule.balanceOf
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        // If balance is greater than 0, they have our NFT!
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          // console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          // console.log("😭 this user doesn't have a membership NFT.");
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error);
      });
  }, [address]);

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Welcome to CryptoneurDAO</span>
          <span className="block">Ready to join?</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={() => connectWallet("injected")}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  const mintNft = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
    bundleDropModule
      .claim("0", 1)
      .catch((err) => {
        console.error("failed to claim", err);
        setIsClaiming(false);
      })
      .finally(() => {
        // Stop loading state.
        setIsClaiming(false);
        // Set claim state.
        setHasClaimedNFT(true);
        // Show user their fancy new NFT!
        // console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
  });
};

if (!hasClaimedNFT) {
  return (
    <>
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">👋 Welcome to CryptoneurDAO</span>
        </h2>
        <span className="block pt-3 text-base">Logged in with</span>
        <span className="block pt-3 text-base font-mono">{address}</span>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <button
            disabled={isClaiming}
            onClick={() => mintNft()}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {isClaiming ? "Minting..." : "Mint your free DAO Membership NFT"}
          </button>
        </div>
      </div>
    </>
  );
}

if (hasClaimedNFT && address) {
  return (
    <>
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">CryptoneurDAO Member Page</span>
        </h2>
        <span className="mt-2 block pt-3 text-lg font-mono">
          Congrats on being a member! 🎉
        </span>
      </div>
      {/* Member Table */}
      <MemberTable memberList={memberList} />
      {/* Voting */}
      <div>
        <h2 className="text-center py-5 text-lg leading-6 font-semibold">
          Active Proposals
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            //before we do async things, we want to disable the button to prevent double clicks
            setIsVoting(true);

            // lets get the votes from the form for the values
            const votes = proposals.map((proposal) => {
              let voteResult = {
                proposalId: proposal.proposalId,
                //abstain by default
                vote: 2,
              };
              proposal.votes.forEach((vote) => {
                const elem = document.getElementById(
                  proposal.proposalId + "-" + vote.type
                );

                if (elem.checked) {
                  voteResult.vote = vote.type;
                  return;
                }
              });
              return voteResult;
            });

            // first we need to make sure the user delegates their token to vote
            try {
              //we'll check if the wallet still needs to delegate their tokens before they can vote
              const delegation = await tokenModule.getDelegationOf(address);
              // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
              if (delegation === ethers.constants.AddressZero) {
                //if they haven't delegated their tokens yet, we'll have them delegate them before voting
                await tokenModule.delegateTo(address);
              }
              // then we need to vote on the proposals
              try {
                await Promise.all(
                  votes.map(async (vote) => {
                    // before voting we first need to check whether the proposal is open for voting
                    // we first need to get the latest state of the proposal
                    const proposal = await voteModule.get(vote.proposalId);
                    // then we check if the proposal is open for voting (state === 1 means it is open)
                    if (proposal.state === 1) {
                      // if it is open for voting, we'll vote on it
                      return voteModule.vote(vote.proposalId, vote.vote);
                    }
                    // if the proposal is not open for voting we just return nothing, letting us continue
                    return;
                  })
                );
                try {
                  // if any of the propsals are ready to be executed we'll need to execute them
                  // a proposal is ready to be executed if it is in state 4
                  await Promise.all(
                    votes.map(async (vote) => {
                      // we'll first get the latest state of the proposal again, since we may have just voted before
                      const proposal = await voteModule.get(vote.proposalId);

                      //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                      if (proposal.state === 4) {
                        return voteModule.execute(vote.proposalId);
                      }
                    })
                  );
                  // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
                  setHasVoted(true);
                  // and log out a success message
                  // console.log("successfully voted");
                } catch (err) {
                  console.error("failed to execute votes", err);
                }
              } catch (err) {
                console.error("failed to vote", err);
              }
            } catch (err) {
              console.error("failed to delegate tokens");
            } finally {
              // in *either* case we need to set the isVoting state to false to enable the button again
              setIsVoting(false);
            }
          }}
        >
          {proposals.map((proposal, index) => (
            <div
              key={proposal.proposalId}
              className="bg-white rounded p-4 shadow my-4"
            >
              <h5 className="text-center text-sm font-semibold text-gray-800">
                {proposal.description}
              </h5>
              <div className="pt-3 text-sm flex justify-evenly">
                {proposal.votes.map((vote) => (
                  <div key={vote.type}>
                    <input
                      type="radio"
                      id={proposal.proposalId + "-" + vote.type}
                      name={proposal.proposalId}
                      value={vote.type}
                      //default the "abstain" vote to chedked
                      defaultChecked={vote.type === 2}
                    />
                    <label
                      className="pt-3 pl-2"
                      htmlFor={proposal.proposalId + "-" + vote.type}
                    >
                      {vote.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <button
              className="bg-blue-600 text-white p-3 rounded shadow text-sm"
              disabled={isVoting || hasVoted}
              type="submit"
            >
              {isVoting
                ? "Voting..."
                : hasVoted
                  ? "You Already Voted"
                  : "Submit Votes"}
            </button>
            <small className="text-gray-600 pt-5">
              This will trigger multiple transactions that you will need to
              sign.
            </small>
          </div>
        </form>
      </div>
    </>
  );
}
}
