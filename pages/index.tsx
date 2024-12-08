import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Dash from  "../pages/dashboard"

import {
  ConnectWallet,
    useAddress,
 } from "@thirdweb-dev/react";
import StickyNavigation from "./StickyNavigation";


const Home: NextPage = () => {
  const router = useRouter();

  const address = useAddress();

  


  

  return (
    <div>
   

      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          
<Dash/>
          

         
        </>
      )}
    </div>
      );
};

export default Home;
