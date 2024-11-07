// Import the axios library for making HTTP requests.
import axios from 'axios';
// Import the CryptoData type definition for TypeScript type checking.
import { CryptoData } from '../types';

// Define the base URL for the CoinGecko API.
const COINGECKO_API = 'https://api.coingecko.com/api/v3';
// Define an array of cryptocurrency IDs to be tracked.
const TRACKED_COINS = ['bitcoin', 'ethereum', 'solana', 'cardano'];

// Define an asynchronous function to fetch cryptocurrency data.
export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    // Make a GET request to the CoinGecko API to fetch the current prices of the tracked coins.
    const response = await axios.get(
      `${COINGECKO_API}/simple/price`, // Endpoint for fetching simple price data.
      {
        params: { // Parameters to be sent with the request.
          ids: TRACKED_COINS.join(','), // Join the tracked coin IDs into a comma-separated string.
          vs_currencies: 'usd', // Specify that we want prices in USD.
          include_24hr_change: true, // Include the 24-hour price change percentage.
          include_last_updated_at: true // Include the last updated timestamp.
        }
      }
    );

    // Map over the tracked coin IDs to create an array of CryptoData objects.
    return TRACKED_COINS.map(id => ({
      id, // The ID of the cryptocurrency.
      symbol: id.substring(0, 3), // Extract the first three characters of the ID as the symbol.
      name: id.charAt(0).toUpperCase() + id.slice(1), // Capitalize the first letter of the ID for the name.
      current_price: response.data[id].usd, // Get the current price in USD from the API response.
      price_change_percentage_24h: response.data[id].usd_24h_change // Get the 24-hour price change percentage from the API response.
    }));
  } catch (error) {
    // Log any errors that occur during the data fetching process.
    console.error('Error fetching crypto data:', error);
    // Rethrow the error to be handled by the calling function.
    throw error;
  }
};