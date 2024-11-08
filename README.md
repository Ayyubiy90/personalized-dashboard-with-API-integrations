# 🚀 Modern Dashboard

A powerful, customizable dashboard application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 Light/Dark mode with smooth transitions
- 📱 Fully responsive design
- 🔄 Real-time data updates
- 🎯 Drag-and-drop widget management
- 💾 Persistent storage
- ⚡ Optimized performance
- 🛡️ Error boundaries for reliability

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Error Boundary
- React Hot Toast
- Hello Pangea DND (Drag & Drop)

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your API keys:
   - OpenWeatherMap API
   - CoinGecko API
   - NewsAPI
   - Google Calendar API

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### API Keys
Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_NEWS_API_KEY=your_newsapi_key
VITE_CALENDER_API_KEY=your calender_api_key
VITE_CLIENT_ID_KEY=your_client_id_key
```

### Widget Settings
Each widget can be configured with:
- Custom refresh intervals
- Specific data sources
- Visual preferences

## 📦 Available Widgets

1. 🌤️ Weather
   - Current conditions
   - Temperature
   - Location

2. 💰 Cryptocurrency
   - Live price updates
   - Price changes
   - Multiple currencies

3. 📰 News Feed
   - Latest headlines
   - Customizable sources
   - Category filtering

4. ✅ Task Manager
   - CRUD operations
   - Progress tracking
   - Priority levels

5. 📅 Calendar
   - Event management
   - Upcoming activities
   - Google Calendar sync

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.