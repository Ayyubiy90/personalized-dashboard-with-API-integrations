// Import the axios library for making HTTP requests.
import axios from 'axios';
// Import the NewsItem type definition for TypeScript type checking.
import { NewsItem } from '../types';

// Define the API key for authenticating requests to the news API.
const API_KEY = 'YOUR_NEWS_API_KEY';
// Define the base URL for fetching top headlines from the news API.
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

// Define an asynchronous function to fetch news data.
export const fetchNewsData = async (): Promise<NewsItem[]> => {
  try {
    // Make a GET request to the news API to fetch top headlines.
    const response = await axios.get(BASE_URL, {
      params: { // Parameters to be sent with the request.
        apiKey: API_KEY, // Include the API key for authentication.
        country: 'us', // Specify the country for which to fetch news (US in this case).
        pageSize: 5, // Limit the number of articles returned to 5.
      },
    });

    // Map over the articles returned in the response to create an array of NewsItem objects.
    return response.data.articles.map((article: any) => ({
      id: article.url, // Use the article's URL as a unique identifier.
      title: article.title, // Get the title of the article.
      url: article.url, // Get the URL of the article.
      source: article.source.name, // Get the name of the source of the article.
      publishedAt: article.publishedAt, // Get the publication date of the article.
    }));
  } catch (error) {
    // Log any errors that occur during the data fetching process.
    console.error('Error fetching news data:', error);
    // Rethrow the error to be handled by the calling function.
    throw error;
  }
};