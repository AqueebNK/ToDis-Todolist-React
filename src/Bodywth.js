import React, { useState } from 'react';
import Bodyside from './Bodyside';  // Import Bodyside component
import Bodycity from './Bodycity';  // Import Bodycity component

export default function Bodywth() {
  const apiKey = "enter your api key"; 
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

  const [city, setCity] = useState('----');
  const [temperature, setTemperature] = useState('--°C');
  const [humidity, setHumidity] = useState('--%');
  const [windSpeed, setWindSpeed] = useState('--km/h');
  const [weatherIcon, setWeatherIcon] = useState('https://img.icons8.com/?size=100&id=648&format=png&color=000000');
  const [inputCity, setInputCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [forecast, setForecast] = useState([]);  // State to store hourly forecast data
  const [timezone, setTimezone] = useState(0);  // State to store the city's timezone offset
  const [feelslike, setFeelslike] = useState('--°C');
  const [pressure, setPressure] = useState('--hPa');
  const [sealevel, setSealevel] = useState('--hPa');

  const checkWeather = async () => {
    if (!inputCity) return;

    try {
      // Fetch current weather data
      const response = await fetch(apiUrl + inputCity + `&appid=${apiKey}`);
      const data = await response.json();
      
      if (data.cod === '404') {
        setErrorMessage('City not found! Please enter a valid city name.');
        return;
      }

      setErrorMessage('');
      setCity(data.name);
      setTemperature(`${data.main.temp}°C`);
      setHumidity(`${data.main.humidity}%`);
      setWindSpeed(`${data.wind.speed} km/h`);
      setFeelslike(`${data.main.feels_like}°C`);
      setPressure(`${data.main.pressure} hPa`);
      setSealevel(`${data.main.sea_level} hPa`);

      // Fetch 24-hour forecast data
      const forecastResponse = await fetch(forecastUrl + inputCity + `&appid=${apiKey}`);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);  // Update forecast state

      let iconUrl = "";
      switch (data.weather[0].main) {
        case "Clouds":
          iconUrl = "https://img.icons8.com/?size=100&id=650&format=png&color=000000";
          break;
        case "Clear":
          iconUrl = "https://img.icons8.com/?size=100&id=648&format=png&color=000000";
          break;
        case "Rain":
          iconUrl = "https://img.icons8.com/?size=100&id=656&format=png&color=000000";
          break;
        case "Drizzle":
          iconUrl = "https://img.icons8.com/?size=100&id=656&format=png&color=000000";
          break;
        case "Mist":
          iconUrl = "https://img.icons8.com/?size=100&id=WtuatlRc0GT9&format=png&color=000000";
          break;
        default:
          iconUrl = "https://img.icons8.com/?size=100&id=648&format=png&color=000000";
      }
      setWeatherIcon(iconUrl);

      // Set timezone from the API response
      setTimezone(data.timezone); // Set the timezone here
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  // Logic for the clear button
  const clearData = () => {
    setInputCity('');
    setCity('----');
    setTemperature('--°C');
    setHumidity('--%');
    setWindSpeed('--km/h');
    setWeatherIcon('https://img.icons8.com/?size=100&id=648&format=png&color=000000');
    setErrorMessage('');
    setForecast([]);
    setTimezone(0);
    setFeelslike('--°C');
    setPressure('--hPa');
    setSealevel('--hPa');
  };

  return (
    <div className="box">
      <div className="hdr">
        <input
          type="text"
          placeholder="City Name"
          value={inputCity} 
          onChange={(e) => setInputCity(e.target.value)} 
        />

        {inputCity && (<div className="clearbt" onClick={clearData}>
          <img src="https://img.icons8.com/?size=100&id=46&format=png&color=000000" alt="Clear btn" />
        </div>)}
        

        <button onClick={checkWeather} type="submit">
          <img
            src="https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000"
            alt="Search"
          />
        </button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="main">
        <img src={weatherIcon} alt="Weather Icon" className="wic" />
        <h1 className="temp">{temperature}</h1>
        <h2 className="city">{city}</h2>
      </div>

      <div className="info">
        <div className="hum">
          <img
            src="https://img.icons8.com/?size=100&id=3432&format=png&color=000000"
            alt="Humidity Icon"
          />
          <h3 className="hu">{humidity}</h3>
          <p>Humidity</p>
        </div>
        <div className="wind">
          <img
            src="https://img.icons8.com/?size=100&id=31842&format=png&color=000000"
            alt="Wind Speed Icon"
          />
          <h3 className="win">{windSpeed}</h3>
          <p>Wind Speed</p>
        </div>
      </div>

      {/* Pass the city, temperature, and timezone to Bodycity */}
      <Bodycity city={city} temperature={temperature} timezone={timezone} feelslike={feelslike} pressure={pressure} sealevel={sealevel} />

      {/* Pass forecast data to Bodyside */}
      <Bodyside forecast={forecast} />
    </div>
  );
}
