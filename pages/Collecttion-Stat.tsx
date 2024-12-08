import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the response structure
interface CollectionStats {
  floor_price: number;
  market_cap: number;
  num_owners: number;
}

const CollectionStatsComponent: React.FC = () => {
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the request options
    const options = {
      method: 'GET',
      url: 'https://api.opensea.io/api/v2/collections/weeping-plebs/stats', // Replace with actual slug
      headers: {
        accept: 'application/json',
        'x-api-key': 'da90cc8f907b4c179836dee60bd0499c',
      },
    };

    // Fetch data
    axios
      .request(options)
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array to run only on mount

  if (loading) return <div> Loading...</div>;
  if (error) return <div> Error: {error}</div>;

  return (
    <div>
      <h2>Collection Stats</h2>
      {stats ? (
        <ul>
          <li>Floor Price: {stats.floor_price}</li>
          <li>Market Cap: {stats.market_cap}</li>
          <li>Total Owners: {stats.num_owners}</li>
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CollectionStatsComponent;