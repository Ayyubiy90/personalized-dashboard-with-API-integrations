/// <reference types="vite/client" />

// Define an interface for environment variables that will be used in the application.
// These variables are expected to be defined in the Vite project configuration.
interface ImportMetaEnv {
  // The API key for accessing the weather service.
  // This key should be stored securely and not exposed publicly.
  readonly VITE_WEATHER_API_KEY: string;

  // The API key for accessing the news service.
  // Similar to the weather API key, this should also be kept secure.
  readonly VITE_NEWS_API_KEY: string;
}

// Extend the ImportMeta interface provided by Vite to include our custom environment variables.
// This allows us to access the defined environment variables in our application code.
interface ImportMeta {
  // The 'env' property contains the environment variables defined in ImportMetaEnv.
  readonly env: ImportMetaEnv;
}