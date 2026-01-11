import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Backend not running");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌦 Weather Dashboard</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br /><br />

      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>🌡 Temperature: {weather.temperature} °C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>🌬 Wind: {weather.wind} m/s</p>
          <p>☁ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;