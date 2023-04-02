import hot from "./assets/hot.jpg";
import cold from "./assets/cold.jpeg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./fetch/weatherService";

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hot);

  const cities = [
    {
      id: 1,
      title: "Berlin",
    },
    {
      id: 2,
      title: "Paris",
    },
    {
      id: 3,
      title: "London",
    },
    {
      id: 4,
      title: "New York",
    },
    {
      id: 5,
      title: "Los Angeles",
    },
    {
      id: 6,
      title: "Beijing",
    },
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const treshold = units === "metric" ? 20 : 68;
      if (data.temp <= treshold) setBg(cold);
      else setBg(hot);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="towns">
              {cities.map((city) => (
                <button
                  key={city.id}
                  className="townNames"
                  onClick={() => setCity(city.title)}
                >
                  {city.title}
                </button>
              ))}
            </div>
            <div className="section sectionInputs btnContainer">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button
                className="btnButton"
                onClick={(e) => handleUnitsClick(e)}
              >
                °F
              </button>
            </div>
            <div className="section sectionTemperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
