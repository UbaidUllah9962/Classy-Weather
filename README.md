# ☁️ Classy Weather

A beautiful weather forecast app built with React that displays a 7-day weather outlook for any location worldwide. Simply type a city name and get instant weather forecasts with intuitive emoji-based weather icons.

## ✨ Features

- **Location Search** — Type any city name (3+ characters) to fetch its weather forecast
- **7-Day Forecast** — View daily high and low temperatures for the upcoming week
- **Weather Icons** — Emoji-based icons representing different weather conditions (sunny, cloudy, rain, snow, thunderstorm, etc.)
- **Country Flags** — Displays the country flag emoji alongside the location name
- **Today Highlight** — The current day's forecast is visually highlighted
- **Persistent Location** — Your last searched location is saved in `localStorage` and restored on next visit
- **Responsive Design** — Optimized layout for mobile, tablet, and desktop screens
- **Glassmorphism UI** — Modern frosted-glass design with smooth hover animations
- **Error Handling** — Graceful error messages for invalid locations or API failures

## 🛠 Tech Stack

- **React 18** — Functional components with Hooks (`useState`, `useEffect`, `useCallback`)
- **Open-Meteo API** — Free geocoding and weather forecast data (no API key required)
- **CSS3** — Custom properties, media queries, backdrop-filter, and keyframe animations
- **Create React App** — Project bootstrapped with CRA

## 📁 Project Structure

```
src/
├── App.js                  # Main application component with weather fetching logic
├── App-v1.js               # Original class-based component version
├── index.js                # React entry point
├── index.css               # Global styles and responsive layout
├── components/
│   ├── my-input/index.js   # Search input component
│   ├── weather/index.js    # Weather list component
│   └── day/index.js        # Individual day forecast card
└── utilities/index.js      # Helper functions (date formatting, weather icons, country flags)
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/UbaidUllah9962/Classy-Weather.git
cd Classy-Weather

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm start` | Run the app in development mode |
| `npm run build` | Create an optimized production build |
| `npm test` | Launch the test runner |

## 🌤 How It Works

1. The user types a location into the search input.
2. Once the input reaches 3 characters, the app queries the **Open-Meteo Geocoding API** to resolve coordinates.
3. The coordinates and timezone are passed to the **Open-Meteo Forecast API** to retrieve daily weather data.
4. The forecast is rendered as a horizontally scrollable list of day cards, each showing the weather icon, day name, and temperature range.
