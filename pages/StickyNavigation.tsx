import React, { useState } from "react";
import styles from "../styles/StickyNavigation.module.css";
import Dashboard from "./dashboard";
// import Logo from "../public/weep.png";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

import { useRouter } from "next/router"; // Import useRouter



  



const StickyNavigation: React.FC<{
  setActivePage: (page: "dash" | "scroller") => void;
}> = ({ setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);


  const router = useRouter(); // Get the current route


  return (
    <div className={styles.container}>
      {/* Top Navigation */}
      <header className={`${styles.stickyTopNav} ${styles.top}`}>
        <div className={styles.navContent}>
        <div className={styles.image1}>
        <a href="/dashboard">
              
              <img src="./weep.png" alt="Logo" className={` ${styles.image}` } onClick={toggleMobileMenu} />
              </a>

              <div className={`${router.pathname === "/dashboard" ? styles.active : ""} ${styles.mobileMenuIcon}`} onClick={toggleMobileMenu}>
              ☰
            </div>
        
        
        </div>
{/* Search Bar */}
<div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search..."
              disabled
              className={styles.searchInput}
            />
          {/* Navigation Links */}
          <nav className={styles.navBar}>
            <ul className={styles.desktopNav}>
              <li><a href="https://weepingplebs.com" target="_blank"  >ABOUT</a></li>
              
              <div className={styles.conbtn}><ConnectWallet/></div>
            </ul>
            {/* Hamburger Icon for Mobile */}
            
          </nav>

          
          </div>
        </div>

        {/* Mobile Menu */}
        
          <ul className={styles.mobileNav}>
            <ConnectWallet />
           {/* {/* <li><a href="#about">About</a></li> */}
           
            
          </ul>
        
      </header>


      {/* Main Content */}
      <main className={styles.mainDiv}>
        {/* Side Navigation */}
        <aside className={styles.stickySideNav}>
        <nav>
        <ul className={`${styles.sideNavList} ${styles.list1}`}>
            <Link href="/dashboard">
              <li className={router.pathname === "/dashboard" ? styles.active : ""}>Dashboard</li>
              </Link>
              <Link href="/myItems">
              <li className={router.pathname === "/myItems" ? styles.active : ""}>My Items</li>
              </Link>
              <Link href="/pools">
              <li className={router.pathname === "/pools" ? styles.active : ""}>Pools</li>
              </Link>
              <Link href="/activity">
              <li className={router.pathname === "/activity" ? styles.active : ""}>Activity</li>
              </Link>
            </ul>
          </nav>
      
      {mobileMenuOpen && (
          <nav>
            <ul className={`${styles.sideNavList} ${styles.lists}`}>
            <Link href="/dashboard">
              <li className={router.pathname === "/dashboard" ? styles.active : ""}>Dashboard</li>
              </Link>
              <Link href="/myItems">
              <li className={router.pathname === "/myItems" ? styles.active : ""}>My Items</li>
              </Link>
              <Link href="/pools">
              <li className={router.pathname === "/pools" ? styles.active : ""}>Pools</li>
              </Link>
              <Link href="/activity">
              <li className={router.pathname === "/activity" ? styles.active : ""}>Activity</li>
              </Link>
            </ul>
          </nav>
        )}




        </aside>

        {/* Main Section */}
        {/* <section className={styles.content}>
          <Dashboard/>
        </section> */}
      </main>
      
    </div>
  );
};

export default StickyNavigation;
