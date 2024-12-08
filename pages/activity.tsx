import React from "react";
import styles from "../styles/Pools.module.css";
import StickyNavigation from "./StickyNavigation";
import { useState } from "react";
// import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';


const { AdvancedRealTimeChart } = require('react-ts-tradingview-widgets');

const TradingViewWithThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');
}


const Pools: React.FC=() => {

  return (
   <>
    <StickyNavigation setActivePage={function (page: "dash" | "scroller"): void {
        throw new Error("Function not implemented.");
      } }/>
    

<div className={styles.coming}>
<AdvancedRealTimeChart
symbol="BTCUSD" 
theme="dark" 
/>
  
</div>
</>
  );
};

export default Pools;
