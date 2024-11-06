// Import the StrictMode component from the React library.
// StrictMode is a tool for highlighting potential problems in an application.
import { StrictMode } from 'react';

// Import the createRoot function from the react-dom/client package.
// This function is used to create a root for rendering the React application.
import { createRoot } from 'react-dom/client';

// Import the main App component from the App.tsx file.
// This component serves as the entry point for the React application.
import App from './App.tsx';

// Import the CSS file for global styles.
// This file contains styles that will be applied throughout the application.
import './index.css';

// Create a root for the React application by selecting the DOM element with the ID 'root'.
// The '!' operator asserts that the element will not be null (TypeScript non-null assertion).
const root = createRoot(document.getElementById('root')!);

// Render the application inside the created root.
// The application is wrapped in StrictMode to enable additional checks and warnings for its children.
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);