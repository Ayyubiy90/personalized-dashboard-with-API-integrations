// Import necessary libraries and components.
import React from "react"; // Import React library for building the component.
import { Sun, Moon, Layout as LayoutIcon } from "lucide-react"; // Import icons from the lucide-react library.
import { useDashboardStore } from "../store"; // Import the Zustand store for managing dashboard state.

// Define the Layout component, which accepts children as props.
export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Destructure theme and setTheme from the Zustand store.
  const { theme, setTheme } = useDashboardStore();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      {" "}
      {/* Apply 'dark' class if the theme is dark. */}
      <div className="min-h-screen transition-colors duration-500">
        {" "}
        {/* Ensure the layout takes at least the full height of the screen with a smooth color transition. */}
        <nav className="glassmorphic sticky top-0 z-50">
          {" "}
          {/* Sticky navigation bar with glassmorphic effect. */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            {/* Center the content with responsive padding. */}
            <div className="flex justify-between h-16">
              {" "}
              {/* Flex container for navigation items. */}
              <div className="flex items-center space-x-3">
                {" "}
                {/* Flex container for logo and title. */}
                <LayoutIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />{" "}
                {/* Layout icon with responsive colors. */}
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                  Modern Dashboard {/* Title of the dashboard. */}
                </h1>
              </div>
              <div className="flex items-center">
                {" "}
                {/* Flex container for the theme toggle button. */}
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")} // Toggle between light and dark themes on button click.
                  className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-200" // Button styling with hover effects.
                >
                  {theme === "light" ? ( // Conditional rendering based on the current theme.
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" /> // Display Moon icon for light theme.
                  ) : (
                    <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" /> // Display Sun icon for dark theme.
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {" "}
          {/* Main content area with responsive padding. */}
          {children} {/* Render the children passed to the Layout component. */}
        </main>
      </div>
    </div>
  );
};
