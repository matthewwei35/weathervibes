import './Weather.css';
import { useState } from 'react';
import RadioButton from './RadioButton';
import WeatherDisplay from './WeatherDisplay';

function Weather() {
  const [zip, setZip] = useState('');
  const [unit, setUnit] = useState('');
  const [data, setData] = useState(null);

  async function fetchWeather() {
    const token = process.env.REACT_APP_OWP_TOKEN;
    const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${token}&units=${unit}`;
    const res = await fetch(path);
    const json = await res.json();

    // console.log(json);

    const cod = json.cod;
    const message = json.message;

    if (cod !== 200) {
      setData({ cod, message })
      return
    }

    const temp = json.main.temp;
    const name = json.name;
    const feelsLike = json.main.feels_like;
    const description = json.weather[0].description;

    setData({
      cod,
      message,
      temp,
      name,
      feelsLike,
      description,
    })
  }

  return (
    <div className="Weather">
      {data && <WeatherDisplay {...data} />}
      <form onSubmit={e => {
        e.preventDefault();
        fetchWeather();
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
    </div>
  );
}

export default Weather;
