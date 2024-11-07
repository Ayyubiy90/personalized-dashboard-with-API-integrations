// Import necessary libraries and components.
import React, { useEffect, useState } from "react"; // Import React and hooks for managing component state and side effects.
import { Cloud, Loader, Droplets, Wind } from "lucide-react"; // Import icons for weather representation.
import { WeatherData, Widget } from "../../types"; // Import type definitions for WeatherData and Widget.
import { fetchWeatherData } from "../../api/weather"; // Import the function to fetch weather data from the API.

// Define the props interface for the WeatherWidget component.
interface Props {
  widget: Widget; // Expect a widget prop of type Widget.
}

// Define the WeatherWidget functional component.
export const WeatherWidget: React.FC<Props> = ({ widget }) => {
  // State to hold the fetched weather data.
  const [data, setData] = useState<WeatherData | null>(null); // Initialize data state as null.
  const [loading, setLoading] = useState(true); // State to manage loading status.

  // useEffect hook to fetch weather data on component mount and at specified intervals.
  useEffect(() => {
    // Define an asynchronous function to fetch weather data.
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data.
        const weatherData = await fetchWeatherData(); // Fetch weather data from the API.
        setData(weatherData); // Update the data state with the fetched weather data.
      } catch (error) {
        console.error("Failed to fetch weather data:", error); // Log any errors that occur during data fetching.
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt (successful or failed).
      }
    };

    fetchData(); // Call the fetchData function to fetch weather data.
    // Set an interval to refresh the weather data based on the widget's refresh interval setting.
    const interval = setInterval(
      fetchData,
      widget.settings.refreshInterval || 300000
    ); // Default to 5 minutes if no interval is set.

    // Cleanup function to clear the interval when the component unmounts or when the refresh interval changes.
    return () => clearInterval(interval);
  }, [widget.settings.refreshInterval]); // Dependency array to re-run the effect if the refresh interval changes.

  // Render loading spinner while data is being fetched.
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        {" "}
        {/* Centered loading spinner container. */}
        <Loader className="w-6 h-6 animate-spin text-blue-500" />{" "}
        {/* Loading spinner icon. */}
      </div>
    );
  }

  // Render an error message if no data is available after loading.
  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        {" "}
        {/* Centered error message container. */}
        <Cloud className="w-8 h-8 mx-auto mb-2" />{" "}
        {/* Cloud icon for visual representation. */}
        <p>Unable to load weather data</p> {/* Error message text. */}
      </div>
    );
  }

  // Render the weather data if it has been successfully fetched.
  return (
    <div className="p-6">
      {" "}
      {/* Main container for the weather widget. */}
      <div className="flex items-center justify-between mb-6">
        {" "}
        {/* Flex container for the title and location. */}
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 text-transparent bg-clip-text">
          {" "}
          {/* Title of the widget with gradient text. */}
          Weather
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {" "}
          {/* Display the location of the weather data. */}
          {data.location}
        </span>
      </div>
      <div className="text-center space-y-4">
        {" "}
        {/* Centered container for weather details. */}
        <div className="flex items-center justify-center space-x-4">
          {" "}
          {/* Flex container for temperature and additional details. */}
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {" "}
            {/* Display the temperature in a large font. */}
            {data.temperature}°C
          </span>
          <div className="flex flex-col items-start text-sm text-gray-500 dark:text-gray-400">
            {" "}
            {/* Container for humidity and wind details. */}
            <div className="flex items-center space-x-1">
              {" "}
              {/* Flex container for humidity detail. */}
              <Droplets className="w-4 h-4" /> {/* Icon for humidity. */}
              <span>Humidity: {data.humidity}%</span>{" "}
              {/* Display humidity percentage . */}
            </div>
            <div className="flex items-center space-x-1">
              {" "}
              {/* Flex container for wind detail. */}
              <Wind className="w-4 h-4" /> {/* Icon for wind. */}
              <span>Wind: {data.windSpeed} km/h</span>{" "}
              {/* Display wind speed. */}
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {" "}
          {/* Display the current weather condition. */}
          {data.condition}
        </p>
      </div>
    </div>
  );
};
