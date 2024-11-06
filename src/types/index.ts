// Define a type alias for Theme which can be either 'light' or 'dark'.
export type Theme = 'light' | 'dark';

// Define an interface for a Widget, which represents a modular component in the application.
export interface Widget {
  // Unique identifier for the widget.
  id: string;
  
  // Type of the widget, which can be one of the defined WidgetType values.
  type: WidgetType;
  
  // Position of the widget, likely used for layout purposes.
  position: number;
  
  // Settings specific to the widget, defined by the WidgetSettings interface.
  settings: WidgetSettings;
}

// Define a type alias for WidgetType, which lists the possible types of widgets.
export type WidgetType = 'weather' | 'crypto' | 'news' | 'tasks' | 'calendar';

// Define an interface for WidgetSettings, which holds customizable settings for a widget.
export interface WidgetSettings {
  // Optional property for refresh interval in milliseconds.
  refreshInterval?: number;
  
  // Index signature allowing any other properties of any type to be added.
  [key: string]: any;
}

// Define an interface for a Task, representing a single task item in a task management system.
export interface Task {
  // Unique identifier for the task.
  id: string;
  
  // Title or description of the task.
  title: string;
  
  // Boolean indicating whether the task is completed or not.
  completed: boolean;
  
  // Timestamp of when the task was created, represented as a string.
  createdAt: string;
}

// Define an interface for WeatherData, which holds data about the weather.
export interface WeatherData {
  // Current temperature in degrees (assumed Celsius or Fahrenheit).
  temperature: number;
  
  // Current weather condition (e.g., sunny, rainy).
  condition: string;
  
  // Location for which the weather data is relevant.
  location: string;
  
  // Icon representing the current weather condition (URL or filename).
  icon: string;
}

// Define an interface for CryptoData, which holds data about a cryptocurrency.
export interface CryptoData {
  // Unique identifier for the cryptocurrency.
  id: string;
  
  // Symbol representing the cryptocurrency (e.g., BTC for Bitcoin).
  symbol: string;
  
  // Name of the cryptocurrency (e.g., Bitcoin).
  name: string;
  
  // Current price of the cryptocurrency.
  current_price: number;
  
  // Percentage change in price over the last 24 hours.
  price_change_percentage_24h: number;
}

// Define an interface for a NewsItem, representing a single news article.
export interface NewsItem {
  // Unique identifier for the news item.
  id: string;
  
  // Title of the news article.
  title: string;
  
  // URL to the full article.
  url: string;
  
  // Source of the news article (e.g., the news organization).
  source: string;
  
  // Timestamp of when the news article was published, represented as a string.
  publishedAt: string;
}

// Define an interface for CalendarEvent, representing a single event on a calendar.
export interface CalendarEvent {
  // Unique identifier for the calendar event.
  id: string;
  
  // Title or description of the event.
  title: string;
  
  // Start time of the event, represented as a string (ISO format expected).
  start: string;
  
  // End time of the event, represented as a string (ISO format expected).
  end: string;
}