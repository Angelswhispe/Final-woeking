import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import {
  nftDropContractAddress,
  stakingContractAddress,
  tokenContractAddress,
} from "../consts/contractAddresses";
import styles from "../styles/Home.module.css";
import Scroller from "./scroller"
import StickyNavigation from "./StickyNavigation";
import Weep from "../public/IMG_5258.gif"



const Dashboard: NextPage = () => {
  const address = useAddress();
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract, isLoading } = useContract(stakingContractAddress);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract]);

  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    await contract?.call("stake", [[id]]);
  }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (

    <div className={styles.mainflex}>
    
    

    <StickyNavigation setActivePage={function (page: "dash" | "scroller"): void {
        throw new Error("Function not implemented.");
      } }/>

    

    <main>
    <div className={styles.container}>
      {!address ? (
        <ConnectWallet />
      ) : (
        <>

        <div className={styles.displaytok}>
        <div className={styles.tokenGrid}>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
              <p className={styles.tokenValue}>
                <b>
                  {    !claimableRewards
        ? "Loading..."
        : Number(ethers.utils.formatUnits(claimableRewards, 18)).toFixed(1)
}
</b>{" "}
{tokenBalance?.symbol}
              </p>
            </div>
            
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>Current Balance</h3>
              <p className={styles.tokenValue}>
                <b>{tokenBalance?.displayValue 
    ? Number(tokenBalance.displayValue).toFixed(1) 
    : "Loading..."}</b> {tokenBalance?.symbol}
              </p>
            </div>
          </div>
<div className={styles.claimRewards}>

<Web3Button className={styles.wallettt}
            action={(contract) => contract.call("claimRewards")}
            contractAddress={stakingContractAddress}
          >
            Claim Rewards
          </Web3Button>
</div>

        </div>
          



<div className={styles.innerContainer}>
          {/* <div>
            <Scroller/>
          </div> */}

        

          {/* <hr className={`${styles.divider} ${styles.spacerTop}`} /> */}
          <h3 className={`${styles.connect} `}>
            Connect your wallet to get started
            </h3>  
          <div className={`${styles.mainDiv} `}>
          <div className={`${styles.top} `}>
            <p>IMAGE</p>
            <p>NAME</p>
            <p>ID</p>
            <p className={styles.stake}>STAKERS</p>
          </div>
          <div className={styles.nftBoxGrid}>
            {stakedTokens &&
              stakedTokens[0]?.map((stakedToken: BigNumber) => (
                <NFTCard
                  tokenId={stakedToken.toNumber()}
                  key={stakedToken.toString()}
                />
              ))}
          

          
          
            {ownedNfts?.map((nft) => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3 className={styles.nftName}>{nft.metadata.name}</h3>
                <Web3Button
                className={styles.wallettt}
                  contractAddress={stakingContractAddress}
                  action={() => stakeNft(nft.metadata.id)}
                >
                  Stake
                </Web3Button>
              </div>
            ))}
            </div>
          </div>
          </div>
        </>
      )}
    </div>
    </main>


    </div>
  );
};

export default Dashboard;
