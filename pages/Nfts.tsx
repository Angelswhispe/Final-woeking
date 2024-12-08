import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

const NFTDisplay: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [nfts, setNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
      fetchNFTs(accounts[0]);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error connecting wallet:", err.message);
        setError("Failed to connect wallet. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const fetchNFTs = async (walletAddress: string) => {
    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: `https://api.opensea.io/api/v1/assets`,
      params: {
        owner: walletAddress,
        limit: 20,
      },
      headers: {
        accept: "application/json",
        "x-api-key": "da90cc8f907b4c179836dee60bd0499c", // Replace with your OpenSea API key
      },
    };

    try {
      const response = await axios.request(options);
      setNFTs(response.data.assets || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios-specific error
        console.error("Axios error:", err.response?.data || err.message);
        setError("Failed to fetch NFTs. Please try again.");
      } else if (err instanceof Error) {
        // General JS Error
        console.error("Error fetching NFTs:", err.message);
        setError("Failed to fetch NFTs. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={connectWallet} style={{ marginBottom: "20px" }}>
        {walletAddress ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading NFTs...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {nfts.map((nft, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <img
              src={nft.image_url || "https://via.placeholder.com/150"}
              alt={nft.name || "NFT"}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4>{nft.name || "Unnamed NFT"}</h4>
            <p>{nft.description || "No description available"}</p>
            <small>Collection: {nft.collection?.name || "Unknown"}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTDisplay;