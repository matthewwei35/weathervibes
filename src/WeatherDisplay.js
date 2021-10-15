function WeatherDisplay(props) {
  const { cod, message, temp, name, feelsLike, humidity, pressure, wind, description } = props;

  if (cod !== 200) {
    return (
      <small>{message}</small>
    )
  }

  return (
    <div className="WeatherDisplay">
      <h1>{temp}&#176;</h1>
      <h2>{name}</h2>
      <small>Feels Like: <b>{feelsLike}&#176;</b> | Humidity: <b>{humidity}%</b> | Pressure: <b>{pressure} inHg</b> |<br/> Wind: <b>{wind} mph</b></small>
      <p>{description}</p>
    </div>
  );
}

export default WeatherDisplay;
