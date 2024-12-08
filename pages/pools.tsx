import React from "react";
import styles from "../styles/Pools.module.css";
import StickyNavigation from "./StickyNavigation";
const Pools: React.FC=() => {

  return (
    <>
    <StickyNavigation setActivePage={function (page: "dash" | "scroller"): void {
        throw new Error("Function not implemented.");
      } }/>
    <div className={styles.coming}>
      <h1 className={styles.comingout}>Coming Soon</h1>
      
    </div></>
  );
};

export default Pools;
