function WeatherDisplay(props) {
  const { cod, message, temp, name, feelsLike, humidity, pressure, wind, description } = props;

  if (cod !== 200) {
    return (
      <small>{message}</small>
    )
  }

  return (
    <div className="WeatherDisplay">
      <h1>{temp}</h1>
      <h2>{name}</h2>
      <small>Feels like: {feelsLike} | Humidity: {humidity} | Pressure: {pressure} |<br/> Wind: {wind}</small>
      <p>{description}</p>
    </div>
  );
}

export default WeatherDisplay;
