import React, { useState } from 'react';
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY = "0d7957b60d0caaa4e3220fe23925cd7c"; 
  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setWeatherData(null);
    try {
      const response = await fetch(
        `https://openweathermap.org{city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data.list[0]);
      const dailyPredictions = data.list.filter((reading) => 
        reading.dt_txt.includes("12:00:00")
      );
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (epochTime) => {
    return new Date(epochTime * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  return (
    <div>
      <div >
        <h1>Weather App</h1>
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {weatherData && (
          <div>
            <h2>Current Weather </h2>
            <p>{weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
