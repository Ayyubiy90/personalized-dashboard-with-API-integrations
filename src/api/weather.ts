// Import the axios library for making HTTP requests.
import axios from 'axios';
// Import the WeatherData type definition for TypeScript type checking.
import { WeatherData } from '../types';

// Define the API key for authenticating requests to the OpenWeatherMap API.
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Use environment variable
// Define a default location for which to fetch weather data (London).
const DEFAULT_LOCATION = 'London';

// Define an asynchronous function to fetch weather data.
export const fetchWeatherData = async (location: string = DEFAULT_LOCATION): Promise<WeatherData> => {
  try {
    // Make a GET request to the OpenWeatherMap API to fetch weather data for the specified location.
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );

    // Return an object containing the relevant weather data.
    return {
      // Round the temperature to the nearest whole number.
      temperature: Math.round(response.data.main.temp),
      // Get the main weather condition (e.g., Clear, Rain, etc.).
      condition: response.data.weather[0].main,
      // Get the name of the location (city) for which the weather data is fetched.
      location: response.data.name,
      // Get the icon code for the weather condition to display an appropriate icon.
      icon: response.data.weather[0].icon,
    };
  } catch (error) {
    // Log any errors that occur during the data fetching process.
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    // Rethrow the error to be handled by the calling function.
    throw error;
  }
};