// Import necessary libraries and components.
import React, { useEffect, useState } from "react"; // Import React and hooks for managing state and side effects.
import { Calendar as CalendarIcon, Clock, Loader } from "lucide-react"; // Import icons for the calendar, clock, and loading spinner.
import { CalendarEvent, Widget } from "../../types"; // Import type definitions for CalendarEvent and Widget.
import { format, isToday, isTomorrow } from "date-fns"; // Import date-fns functions for date formatting and checking.

// Define the props interface for the CalendarWidget component.
interface Props {
  widget: Widget; // Expect a widget prop of type Widget.
}

// Mock data for calendar events.
const mockEvents: CalendarEvent[] = [
  {
    id: "1", // Unique identifier for the event.
    title: "Team Meeting", // Title of the event.
    start: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // Start time of the event (1 hour from now).
    end: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // End time of the event (2 hours from now).
  },
  {
    id: "2", // Unique identifier for the event.
    title: "Project Deadline", // Title of the event.
    start: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Start time of the event (24 hours from now).
    end: new Date(Date.now() + 1000 * 60 * 60 * 25).toISOString(), // End time of the event (25 hours from now).
  },
];

// Define the CalendarWidget component.
export const CalendarWidget: React.FC<Props> = ({ widget }) => {
  // State to hold the list of events and loading status.
  const [events, setEvents] = useState<CalendarEvent[]>([]); // Initialize events state as an empty array.
  const [loading, setLoading] = useState(true); // Initialize loading state as true.

  // useEffect hook to fetch events when the component mounts or when the refresh interval changes.
  useEffect(() => {
    // Function to simulate fetching events from an API.
    const fetchEvents = async () => {
      try {
        setLoading(true); // Set loading to true before fetching.
        // Simulate an API call with a timeout.
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second.
        setEvents(mockEvents); // Set the events state with mock data.
      } catch (error) {
        console.error("Failed to fetch events:", error); // Log any errors that occur during fetching.
      } finally {
        setLoading(false); // Set loading to false after fetching is complete.
      }
    };

    fetchEvents(); // Call the fetchEvents function to get the events.
    // Set up an interval to refresh events based on the widget's settings.
    const interval = setInterval(
      fetchEvents,
      widget.settings.refreshInterval || 300000
    ); // Default to 5 minutes if no interval is set.

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [widget.settings.refreshInterval]); // Dependency array to re-run effect when refreshInterval changes.

  // Function to determine the display text for the event day.
  const getEventDay = (date: string) => {
    if (isToday(new Date(date))) return "Today"; // Return 'Today' if the event is today.
    if (isTomorrow(new Date(date))) return "Tomorrow"; // Return 'Tomorrow' if the event is tomorrow.
    return format(new Date(date), "MMM d"); // Format the date for other days.
  };

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

  // Render the calendar widget with events.
  return (
    <div className="p-6">
      {" "}
      {/* Main container for the calendar widget. */}
      <div className="flex items-center justify-between mb-6">
        {" "}
        {/* Header section for the calendar title and icon. */}
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 text-transparent bg-clip-text">
          Calendar {/* Title of the widget. */}
        </h3>
        <CalendarIcon className="w- 5 h-5 text-blue-500 dark:text-blue-400" />{" "}
        {/* Calendar icon with styling. */}
      </div>
      <div className="space-y-4">
        {" "}
        {/* Container for the list of events with spacing. */}
        {events.map(
          (
            event // Map through the events array to render each event.
          ) => (
            <div
              key={event.id} // Unique key for each event.
              className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200" // Styling for each event card.
            >
              <div className="flex items-start justify-between">
                {" "} 
                {/* Flex container for event details. */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {event.title} {/* Display the event title. */}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getEventDay(event.start)}{" "}
                    {/* Display the day of the event using the getEventDay function. */}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  {" "}
                  {/* Flex container for time display. */}
                  <Clock className="w-4 h-4 mr-1" />{" "}
                  {/* Clock icon for time. */}
                  {format(new Date(event.start), "HH:mm")}{" "}
                  {/* Format and display the event start time. */}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
