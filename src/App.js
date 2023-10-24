import React, { useState, useEffect } from 'react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('YourCityName'); // Replace with the city you want to fetch weather for
  const apiKey = 'YourAPIKey'; // Replace with your weather API key

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [city, apiKey]);

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;
