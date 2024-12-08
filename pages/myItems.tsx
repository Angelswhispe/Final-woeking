
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import Stickynavigation from "./StickyNavigation";

// Define the type for an NFT
interface NFT {
  token_id: string;
  name: string | null;
  image_url: string | null;
}

const App: React.FC = () => {
  const nftDisplayRef = useRef<HTMLDivElement>(null);
  const address = useAddress(); // Use the thirdweb hook to get the connected wallet address
  const [error, setError] = useState<string>("");

  // Function to fetch NFTs
  const fetchNFTs = async (walletAddress: string) => {
    try {
      setError(""); // Clear any previous errors
      const response = await axios.get(
        `https://api.opensea.io/api/v2/chain/base/account/${walletAddress}/nfts`,
        {
          headers: {
            accept: "application/json",
            "x-api-key": "da90cc8f907b4c179836dee60bd0499c",
          },
        }
      );

      const nfts: NFT[] = response.data.nfts;

      if (nftDisplayRef.current) {
        nftDisplayRef.current.innerHTML = ""; // Clear previous results

        nfts.forEach((nft) => {
          const nftCard = document.createElement("div");
          nftCard.style.border = "1px solid #ddd";
          nftCard.style.borderRadius = "8px";
          nftCard.style.padding = "10px";
          nftCard.style.textAlign = "center";

          const tokenId = nft.token_id || "Unknown Token ID";
          const imageUrl = nft.image_url || "";
          const name = nft.name || "Unnamed NFT";

          if (imageUrl) {
            const image = document.createElement("img");
            image.src = imageUrl;
            image.alt = name;
            image.style.width = "100%";
            image.style.borderRadius = "8px";
            nftCard.appendChild(image);
          } else {
            const placeholder = document.createElement("div");
            placeholder.style.width = "100%";
            placeholder.style.height = "150px";
            placeholder.style.background = "#f0f0f0";
            placeholder.style.borderRadius = "8px";
            placeholder.innerText = "No Image Available";
            nftCard.appendChild(placeholder);
          }

          const nameElement = document.createElement("h3");
          nameElement.textContent = name;

          const tokenIdElement = document.createElement("p");
          // tokenIdElement.textContent = `Token ID: ${tokenId}`;

          nftCard.appendChild(nameElement);
          nftCard.appendChild(tokenIdElement);

          nftDisplayRef.current.appendChild(nftCard);
        });
      }
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      setError("Failed to fetch NFTs. Please try again later.");
    }
  };

  // Automatically fetch NFTs when the wallet address changes
  useEffect(() => {
    if (address) {
      fetchNFTs(address);
    }
  }, [address]);

  return (

   <>
        <Stickynavigation setActivePage={function (page: "dash" | "scroller"): void {
        throw new Error("Function not implemented.");
      } }/>
    <div style={{ fontFamily: "Arial, sans-serif", padding: "120px 350px" }}>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!address ? (
          <div>
            <p>Please connect your wallet to view NFTs.</p>
            <ConnectWallet />
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        ref={nftDisplayRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      ></div>
    </div></>
  );
};

export default App;