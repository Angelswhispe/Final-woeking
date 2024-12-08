import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

// Define the type for an NFT
interface NFT {
  token_id: string;
  name: string | null;
  image_url: string | null;
}

// Define the component
const App: React.FC = () => {
  const collectionInputRef = useRef<HTMLInputElement>(null);
  const nftDisplayRef = useRef<HTMLDivElement>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Automatically retrieve the wallet address
  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []); // Request access to the user's wallet
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
        } catch (err) {
          console.error("Error connecting to wallet:", err);
          setError("Could not connect to wallet. Please check MetaMask.");
        }
      } else {
        console.error("MetaMask not detected");
        setError("MetaMask not detected. Please install MetaMask.");
      }
    };

    getWalletAddress();
  }, []);

  const fetchNFTs = async () => {
    const collectionSlug = collectionInputRef.current?.value || "";

    if (!walletAddress) {
      setError("Wallet address is not available.");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const response = await axios.get(`https://api.opensea.io/api/v2/chain/base/account/${walletAddress}/nfts`, {
        params: { collection: collectionSlug },
        headers: {
          accept: "application/json",
          "x-api-key": "da90cc8f907b4c179836dee60bd0499c",
        },
      });

      const nfts: NFT[] = response.data.nfts;

      if (nftDisplayRef.current) {
        nftDisplayRef.current.innerHTML = ""; // Clear previous results

        nfts.forEach((nft) => {
          const nftCard = document.createElement("div");
          nftCard.style.border = "1px solid #ddd";
          nftCard.style.borderRadius = "8px";
          nftCard.style.padding = "10px";
          nftCard.style.textAlign = "center";

          if (nft.image_url) {
            const image = document.createElement("img");
            image.src = nft.image_url;
            image.alt = nft.name || "Unnamed NFT";
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

          const name = document.createElement("h3");
          name.textContent = nft.name || "Unnamed NFT";

          const tokenId = document.createElement("p");
          tokenId.textContent = `Token ID: ${nft.token_id}`;

          nftCard.appendChild(name);
          nftCard.appendChild(tokenId);

          nftDisplayRef.current.appendChild(nftCard);
        });
      }
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      setError("Failed to fetch NFTs. Please check the collection slug or try again later.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>NFT Viewer</h1>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          value={walletAddress}
          readOnly
          placeholder="Wallet Address"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input ref={collectionInputRef} type="text" placeholder="Collection Slug" style={{ marginRight: "10px", padding: "5px" }} />
        <button onClick={fetchNFTs} style={{ padding: "5px 10px" }}>
          Fetch NFTs
        </button>
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
    </div>
  );
};

export default App;