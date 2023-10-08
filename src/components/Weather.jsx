import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import rain_icon from "../Assets/rain.png";
import humidity_icon from "../Assets/humidity.png";
import drizzle_icon from "../Assets/drizzle.png";
import cloud_icon from "../Assets/cloud.png";
import clear_icon from "../Assets/clear.png";
import { useState } from "react";

const Weather = () => {
    const [Search, setSearch] = useState("");
    const [Temp, setTemp] = useState(24)
    const [City, setCity] = useState("London");
    const [Humidity, setHumidity] = useState(64);
    const [WindSpeed, setWindSpeed] = useState(18);
    const [WeatherIcon, setWeatherIcon] = useState(cloud_icon);

    const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        try {
            if (Search === "") {
                return 0;
            }
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${Search}&units=Metric&appid=${API_KEY}`
            const res = await fetch(url);
            const data = await res.json();
            setSearch("");
            setCity(data.name);
            setTemp(Math.floor(data.main.temp));
            setWindSpeed(Math.floor(data.wind.speed));
            setHumidity(data.main.humidity);

            if (data?.weather[0]?.icon === "01d" || data?.weather[0]?.icon === "01n") {
                setWeatherIcon(clear_icon);
            }
            else if (data?.weather[0]?.icon === "02d" || data?.weather[0]?.icon === "02n") {
                setWeatherIcon(cloud_icon);
            }
            else if (data?.weather[0]?.icon === "03d" || data?.weather[0]?.icon === "03n") {
                setWeatherIcon(drizzle_icon);
            }
            else if (data?.weather[0]?.icon === "04d" || data?.weather[0]?.icon === "04n") {
                setWeatherIcon(drizzle_icon);
            }
            else if (data?.weather[0]?.icon === "09d" || data?.weather[0]?.icon === "09n") {
                setWeatherIcon(rain_icon);
            }
            else if (data?.weather[0]?.icon === "10d" || data?.weather[0]?.icon === "10n") {
                setWeatherIcon(rain_icon);
            }
            else if (data?.weather[0]?.icon === "13d" || data?.weather[0]?.icon === "13n") {
                setWeatherIcon(snow_icon);
            }
            else {
                setWeatherIcon(clear_icon);
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" value={Search} placeholder="Search" onChange={e => setSearch(e.target.value)} />
                <div className="search-icon" onClick={fetchData}>
                    <img src={search_icon} alt="search_icon" />
                </div>
            </div>

            {
                City && Temp && Humidity && WindSpeed ?
                    <div className="weather-content">
                        <div className="weather-image">
                            <img src={WeatherIcon} alt="cloud_icon" />
                        </div>
                        <div className="weather-temp">{Temp}°C</div>
                        <div className="weather-location">{City}</div>
                        <div className="data-container">
                            <div className="element">
                                <img className="icon" src={humidity_icon} alt="humidity_icon" />
                                <div className="data">
                                    <div className="humidity-percent">{Humidity}%</div>
                                    <div className="text">Humidity</div>
                                </div>
                            </div>
                            <div className="element">
                                <img className="icon" src={wind_icon} alt="wind_icon" />
                                <div className="data">
                                    <div className="wind-rate">{WindSpeed} km/hr</div>
                                    <div className="text">Wind Speed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <p className="error">Data not Found !!!</p>
            }



        </div>
    )
}

export default Weather