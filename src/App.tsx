// Importing React library to create components.
import React from "react";

// Importing Toaster component from react-hot-toast for toast notifications.
import { Toaster } from "react-hot-toast";

// Importing Layout component which likely provides a common layout structure for the app.
import { Layout } from "./components/Layout";

// Importing WidgetGrid component which will display a grid of widgets.
import { WidgetGrid } from "./components/WidgetGrid";

// Importing AddWidget component which allows users to add new widgets.
import { AddWidget } from "./components/AddWidget";

// Importing ErrorBoundary from react-error-boundary to handle errors in child components.
import { ErrorBoundary } from "react-error-boundary";

// Function component that serves as a fallback UI for errors caught by ErrorBoundary.
function ErrorFallback({ error }: { error: Error }) {
  return (
    // Centered container for the error message.
    <div className="text-center p-4">
      {/* Heading that indicates an error occurred, styled with red text. */}
      <h2 className="text-lg font-semibold text-red-600">
        Something went wrong:
      </h2>
      {/* Display the error message in a preformatted text block, styled with red text. */}
      <pre className="mt-2 text-sm text-red-500">{error.message}</pre>
    </div>
  );
}

// Main application component.
function App() {
  return (
    // Wrapping the application in an ErrorBoundary to catch errors in child components.
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Layout component that provides a consistent layout structure. */}
      <Layout>
        {/* WidgetGrid component that displays a grid of widgets. */}
        <WidgetGrid />

        {/* AddWidget component that provides functionality to add new widgets. */}
        <AddWidget />

        {/* Toaster component positioned at the bottom-right for displaying toast notifications. */}
        <Toaster position="bottom-right" />
      </Layout>
    </ErrorBoundary>
  );
}

// Exporting the App component as the default export of the module.
export default App;
