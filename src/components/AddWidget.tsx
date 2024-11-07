// Import necessary libraries and components.
import React from "react"; // Import React library for building the component.
import { Plus, X, Move } from "lucide-react"; // Import icons from the lucide-react library.
import { useDashboardStore } from "../store"; // Import the Zustand store for managing dashboard state.
import { WidgetType } from "../types"; // Import the WidgetType type for type safety.

// Define the available widget options with their types, labels, and icons.
const WIDGET_OPTIONS = [
  { type: "weather", label: "Weather", icon: "🌤️" }, // Weather widget option.
  { type: "crypto", label: "Cryptocurrency", icon: "💰" }, // Cryptocurrency widget option.
  { type: "news", label: "News Feed", icon: "📰" }, // News Feed widget option.
  { type: "tasks", label: "Task Manager", icon: "✅" }, // Task Manager widget option.
  { type: "calendar", label: "Calendar", icon: "📅" }, // Calendar widget option.
] as const; // Use 'as const' to ensure the array is treated as a readonly tuple.

export const AddWidget: React.FC = () => {
  // State to manage the visibility of the widget options menu.
  const [isOpen, setIsOpen] = React.useState(false);

  // Get the addWidget function from the Zustand store.
  const addWidget = useDashboardStore((state) => state.addWidget);

  // Function to handle adding a new widget.
  const handleAddWidget = (type: WidgetType) => {
    // Call the addWidget function from the store with the new widget's details.
    addWidget({
      id: `${type}-${Date.now()}`, // Generate a unique id for the widget.
      type, // Set the type of the widget.
      position: 0, // Set the initial position of the widget.
      settings: {
        refreshInterval: 300000, // Set the refresh interval for the widget (5 minutes).
      },
    });
    setIsOpen(false); // Close the widget options menu after adding the widget.
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {" "}
      {/* Position the component fixed at the bottom right corner. */}
      {isOpen && ( // Conditionally render the widget options menu if isOpen is true.
        <div className="absolute bottom-16 right-0 glassmorphic rounded-2xl shadow-xl p-4 mb-4 w-64 backdrop-blur-xl">
          {/* Container for the widget options menu with styling. */}
          <div className="flex justify-between items-center mb-3">
            {" "}
            {/* Flex container for header. */}
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              Add Widget {/* Title of the menu. */}
            </h3>
            <button
              onClick={() => setIsOpen(false)} // Close the menu when clicked.
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              <X className="w-5 h-5" /> {/* Close icon. */}
            </button>
          </div>
          <div className="space-y-2">
            {" "}
            {/* Container for the widget options with spacing. */}
            {WIDGET_OPTIONS.map(
              (
                { type, label, icon } // Map through the widget options.
              ) => (
                <button
                  key={type} // Unique key for each button.
                  onClick={() => handleAddWidget(type)} // Call handleAddWidget with the widget type when clicked.
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {icon} {/* Display the icon for the widget. */}
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    {label}
                  </span>{" "}
                  {/* Display the label for the widget. */}
                  <Move className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />{" "}
                  {/* Move icon with opacity transition. */}
                </button>
              )
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle the visibility of the widget options menu.
        className="glassmorphic hover:bg-blue-500/80 hover:border-blue-400/50 text-blue-600 hover:text-white dark:text-blue-400 dark:hover:text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-blue-500/25 hover:shadow-xl">
        <Plus className="w-6 h-6" /> {/* Plus icon to add a new widget. */}
      </button>
    </div>
  );
};
