import React, { useEffect, useState } from "react";
import Utilities from "./utilities";
import MyInput from "./components/my-input";
import Weather from "./components/weather";

const App = () => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (location.length < 3) {
      setWeather({});
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      setDisplayLocation(`${name} ${Utilities.convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
    } catch (err) {
      console.error(err);
      setWeather({});
      setError(err.message || "Something went wrong fetching weather.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLocation(localStorage.getItem("location") || "");
  }, []);

  useEffect(() => {
    fetchWeather();
    if (location !== "") localStorage.setItem("location", location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
