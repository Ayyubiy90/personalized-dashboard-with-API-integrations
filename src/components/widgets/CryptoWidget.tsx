// Import necessary libraries and components.
import React, { useEffect, useState } from "react"; // Import React and hooks for managing state and side effects.
import { TrendingUp, TrendingDown, Loader } from "lucide-react"; // Import icons for trending up, trending down, and loading spinner.
import { CryptoData, Widget } from "../../types"; // Import type definitions for CryptoData and Widget.
import { fetchCryptoData } from "../../api/crypto"; // Import the function to fetch cryptocurrency data from the API.

// Define the props interface for the CryptoWidget component.
interface Props {
  widget: Widget; // Expect a widget prop of type Widget.
}

// Define the CryptoWidget functional component.
export const CryptoWidget: React.FC<Props> = ({ widget }) => {
  // State to hold the cryptocurrency data and loading status.
  const [data, setData] = useState<CryptoData[]>([]); // Initialize data state as an empty array.
  const [loading, setLoading] = useState(true); // Initialize loading state as true.

  // useEffect hook to fetch cryptocurrency data when the component mounts or when the refresh interval changes.
  useEffect(() => {
    // Function to fetch cryptocurrency data from the API.
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data.
        const cryptoData = await fetchCryptoData(); // Fetch the cryptocurrency data from the API.
        setData(cryptoData); // Update the data state with the fetched data.
      } catch (error) {
        console.error("Failed to fetch crypto data:", error); // Log any errors that occur during fetching.
      } finally {
        setLoading(false); // Set loading to false after fetching is complete.
      }
    };

    fetchData(); // Call the fetchData function to get the cryptocurrency data.
    // Set up an interval to refresh data based on the widget's settings.
    const interval = setInterval(
      fetchData,
      widget.settings.refreshInterval || 60000
    ); // Default to 60 seconds if no interval is set.

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [widget.settings.refreshInterval]); // Dependency array to re-run effect when refreshInterval changes.

  // If loading, display a loading spinner.
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        {" "}
        {/* Center the loading spinner. */}
        <Loader className="w-6 h-6 animate-spin text-blue-500" />{" "}
        {/* Display the loading spinner with styling. */}
      </div>
    );
  }

  // Render the cryptocurrency widget with the fetched data.
  return (
    <div className="p-4">
      {" "}
      {/* Main container for the cryptocurrency widget. */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {" "}
        {/* Title of the widget. */}
        Cryptocurrency
      </h3>
      <div className="space-y-4">
        {" "}
        {/* Container for the list of cryptocurrencies with spacing. */}
        {data.map(
          (
            coin // Map through the data array to render each cryptocurrency.
          ) => (
            <div
              key={coin.id} // Unique key for each cryptocurrency.
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg" // Styling for each cryptocurrency card.
            >
              <div className="flex items-center space-x-3">
                {" "}
                {/* Flex container for coin symbol and name. */}
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {" "}
                  {/* Display the coin symbol. */}
                  {coin.symbol.toUpperCase()}{" "}
                  {/* Convert symbol to uppercase for display. */}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {" "}
                  {/* Display the coin name. */}
                  {coin.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {" "}
                {/* Flex container for price and change percentage. */}
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {" "}
                  {/* Display the current price. */}$
                  {coin.current_price.toLocaleString()}{" "}
                  {/* Format the price with commas. */}
                </span>
                <div
                  className={`flex items-center ${
                    // Determine the color based on price change percentage.
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500" // Green for positive change.
                      : "text-red-500" // Red for negative change.
                  }`}>
                  {coin.price_change_percentage_24h >= 0 ? ( // Conditional rendering for the trend icon.
                    <TrendingUp className="w-4 h-4" /> // Display trending up icon for positive change.
                  ) : (
                    <TrendingDown className="w-4 h-4" /> // Display trending down icon for negative change.
                  )}
                  <span className="text-sm ml-1">
                    {" "}
                    {/* Display the price change percentage. */}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(
                      2
                    )}% {/* Format the percentage to two decimal places. */}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
