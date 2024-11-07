// Import necessary libraries and components.
import React, { useEffect, useState } from "react"; // Import React and hooks for managing state and side effects.
import { Newspaper, ExternalLink, Loader } from "lucide-react"; // Import icons for newspaper, external link, and loading spinner.
import { NewsItem, Widget } from "../../types"; // Import type definitions for NewsItem and Widget.
import { fetchNewsData } from "../../api/news"; // Import the function to fetch news data from the API.
import { format } from "date-fns"; // Import date-fns for formatting dates.

// Define the props interface for the NewsWidget component.
interface Props {
  widget: Widget; // Expect a widget prop of type Widget.
}

// Define the NewsWidget functional component.
export const NewsWidget: React.FC<Props> = ({ widget }) => {
  // State to hold the news items and loading status.
  const [news, setNews] = useState<NewsItem[]>([]); // Initialize news state as an empty array.
  const [loading, setLoading] = useState(true); // Initialize loading state as true.

  // useEffect hook to fetch news data when the component mounts or when the refresh interval changes.
  useEffect(() => {
    // Function to fetch news data from the API.
    const fetchNews = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data.
        const data = await fetchNewsData(); // Fetch the news data from the API.
        setNews(data); // Update the news state with the fetched data.
      } catch (error) {
        console.error("Failed to fetch news:", error); // Log any errors that occur during fetching.
      } finally {
        setLoading(false); // Set loading to false after fetching is complete.
      }
    };

    fetchNews(); // Call the fetchNews function to get the news data.
    // Set up an interval to refresh news data based on the widget's settings.
    const interval = setInterval(
      fetchNews,
      widget.settings.refreshInterval || 300000
    ); // Default to 5 minutes if no interval is set.

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [widget.settings.refreshInterval]); // Dependency array to re-run effect when refreshInterval changes.

  // If loading, display a loading spinner.
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        {" "}
        {/* Center the loading spinner. */}
        <Loader className="w-6 h-6 animate-spin text-blue-500" />{" "}
        {/* Display the loading spinner with styling. */}
      </div>
    );
  }

  // Render the news widget with the fetched news data.
  return (
    <div className="p-6">
      {" "}
      {/* Main container for the news widget. */}
      <div className="flex items-center justify-between mb-6">
        {" "}
        {/* Flex container for the title and icon. */}
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 text-transparent bg-clip-text">
          {" "}
          {/* Title of the widget with gradient text. */}
          Latest News
        </h3>
        <Newspaper className="w-5 h-5 text-blue-500 dark:text-blue-400" />{" "}
        {/* Display the newspaper icon. */}
      </div>
      <div className="space-y-4">
        {" "}
        {/* Container for the list of news items with spacing. */}
        {news.map(
          (
            item // Map through the news array to render each news item.
          ) => (
            <a
              key={item.id} // Unique key for each news item.
              href={item.url} // Link to the news article.
              target="_blank" // Open the link in a new tab.
              rel="noopener noreferrer" // Security measures for external links.
              className="block group" // Block-level link with group class for hover effects.
            >
              <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200">
                {" "}
                {/* Styling for each news item card. */}
                <div className="flex justify-between items-start gap-2">
                  {" "}
                  {/* Flex container for title and external link icon. */}
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {" "}
                    {/* Display the news title. */}
                    {item.title} {/* Title of the news item. */}
                  </h4>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover :text-blue-500 transition-colors" />{" "}
                  {/* External link icon with hover effect. */}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  {" "}
                  {/* Container for source and published date. */}
                  <span>{item.source}</span>{" "}
                  {/* Display the source of the news item. */}
                  <span>
                    {format(new Date(item.publishedAt), "MMM d, yyyy")}
                  </span>{" "}
                  {/* Format and display the published date. */}
                </div>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );
};
