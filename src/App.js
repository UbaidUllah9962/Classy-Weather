import React, { useCallback, useEffect, useState } from "react";
import Utilities from "./utilities";
import MyInput from "./components/my-input";
import Weather from "./components/weather";

const App = () => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const fetchWeather = useCallback(async () => {
    if (location.length < 2) {
      setWeather({});
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      let latitude, longitude, timezone, locationName, countryCode;
      const trimmed = location.trim();
      const isPostalCode = /^\d{4,10}$/.test(trimmed);

      if (isPostalCode) {
        // Use Nominatim for postal code lookups
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(trimmed)}&format=json&limit=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const geoData = await geoRes.json();

        if (!geoData.length) throw new Error("Location not found for this postal code");

        const result = geoData[0];
        latitude = parseFloat(result.lat);
        longitude = parseFloat(result.lon);
        timezone = null;
        // Extract a short name from the display_name
        locationName = result.display_name.split(",")[0].trim();
        countryCode = null;
      } else {
        // Use Open-Meteo geocoding for city/country name lookups
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Location not found");

        const result = geoData.results.at(0);
        latitude = result.latitude;
        longitude = result.longitude;
        timezone = result.timezone;
        locationName = result.name;
        countryCode = result.country_code;
      }

      setDisplayLocation(
        countryCode
          ? `${locationName} ${Utilities.convertToFlag(countryCode)}`
          : locationName
      );

      // 2) Getting actual weather
      // Fall back to "auto" when the geocoding API doesn't return a timezone
      const tz = timezone || "auto";
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${tz}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      if (!weatherRes.ok)
        throw new Error(`Weather API error: ${weatherRes.status}`);
      const weatherData = await weatherRes.json();
      if (!weatherData.daily)
        throw new Error("Unexpected response from weather service");
      setWeather(weatherData.daily);
    } catch (err) {
      console.error(err);
      setWeather({});
      setError(err.message || "Something went wrong fetching weather.");
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    setLocation(localStorage.getItem("location") || "");
  }, []);

  useEffect(() => {
    fetchWeather();
    if (location !== "") localStorage.setItem("location", location);
  }, [location, fetchWeather]);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <MyInput
        location={location}
        onChangeLocation={(e) => setLocation(e.target.value)}
      />

      {isLoading && <p className="loader">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
};

export default App;
