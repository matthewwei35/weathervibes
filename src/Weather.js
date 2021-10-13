import './Weather.scss';
import { useState } from 'react';
import RadioButton from './RadioButton';
import WeatherDisplay from './WeatherDisplay';

function Weather() {
  const [zip, setZip] = useState('');
  const [unit, setUnit] = useState('');
  const [data, setData] = useState(null);
  const token = process.env.REACT_APP_OWP_TOKEN;

  function fetchWeatherByGeo() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      const path = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${token}&units=${unit}`;
      fetchWeather(path);
    }, err => {
      console.log(err.message);
    }, options);
  }

  function fetchWeatherByZip() {
    const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${token}&units=${unit}`;
    fetchWeather(path);
  }

  async function fetchWeather(path) {
    const res = await fetch(path);
    const json = await res.json();

    const cod = json.cod;
    const message = json.message;
    if (cod !== 200) {
      setData({ cod, message })
      return
    }

    const temp = json.main.temp;
    const name = json.name;
    const feelsLike = json.main.feels_like;
    const humidity = json.main.humidity;
    const pressure = json.main.pressure;
    const wind = json.wind.speed;
    const description = json.weather[0].description;

    setData({
      cod,
      message,
      temp,
      name,
      feelsLike,
      humidity,
      pressure,
      wind,
      description,
    })
  }

  return (
    <div className="Weather">
      {data && <WeatherDisplay {...data} />}
      <form onSubmit={e => {
        e.preventDefault();
        fetchWeatherByZip();
      }}>
        <div>
          <input
            placeholder="Enter zip code"
            value={zip}
            onChange={e => setZip(e.target.value)}
          />
          <button type="submit">Submit</button>
        </div>

        <select
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          <option value="metric">Calcius</option>
          <option value="imperial">Fahrenheit</option>
          <option value="standard">Kelvin</option>
        </select>

        <RadioButton
          label="metric"
          name="unit"
          checked={unit === 'metric'}
          onChange={() => setUnit('metric')}
        />
        <RadioButton
          label="imperial"
          name="unit"
          checked={unit === 'imperial'}
          onChange={() => setUnit('imperial')}
        />
        <RadioButton
          label="standard"
          name="unit"
          checked={unit === 'standard'}
          onChange={() => setUnit('standard')}
        />
      </form>
      <button
        onClick={() => fetchWeatherByGeo()}
      >Get weather by location</button>
    </div>
  );
}

export default Weather;
