import React, { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Clock, Loader } from "lucide-react";
import { CalendarEvent, Widget } from "../../types";
import { format, isToday, isTomorrow } from "date-fns";
import { gapi } from "gapi-script"; // Import gapi for Google API

interface Props {
  widget: Widget;
}

const CalendarWidget: React.FC<Props> = ({ widget }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await gapi.client.calendar.events.list({
          calendarId: "primary", // Use 'primary' for the user's primary calendar
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime",
        });

        const items = response.result.items;
        const fetchedEvents = items.map((item: any) => ({
          id: item.id,
          title: item.summary,
          start: item.start.dateTime || item.start.date,
          end: item.end.dateTime || item.end.date,
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    const initClient = () => {
      gapi.client
        .init({
          apiKey: import.meta.env.VITE_CALENDAR_API_KEY, // Use the API key from .env
          clientId: import.meta.env.VITE_CLIENT_ID_KEY, // Use the Client ID from .env
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.readonly",
        })
        .then(() => {
          fetchEvents(); // Fetch events after client is initialized
        });
    };

    gapi.load("client:auth2", initClient); // Load the client and auth2 libraries

    const interval = setInterval(
      fetchEvents,
      widget.settings.refreshInterval || 300000
    );

    return () => clearInterval(interval);
  }, [widget.settings.refreshInterval]);

  const getEventDay = (date: string) => {
    if (isToday(new Date(date))) return "Today";
    if (isTomorrow(new Date(date))) return "Tomorrow";
    return format(new Date(date), "MMM d");
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 text-transparent bg-clip-text">
          Calendar
        </h3>
        <CalendarIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200">
            <div className="flex items center justify-between">
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-gray-500">
                  {getEventDay(event.start)}
                </p>
              </div>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400">
              {format(new Date(event.start), "hh:mm a")} -{" "}
              {format(new Date(event.end), "hh:mm a")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;