import { useState, useEffect } from "react";

const api = {
    key: "9dbcfedf57a26d67bfafad14f76235ad",
    base: 'https://api.openweathermap.org/data/2.5/',
}

const WeatherApp = () => {
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState('/allWeather.webp');
    const [humidity, setHumidity] = useState(null);
    // const [temperature, setTemperature] = useState();


    const sunny = '/sunny.png';
    const brokenClouds = '/broken-clouds.png';
    const partly = '/partly-cloudy.png'
    const cloudy = '/cloudy.png';
    const raining = '/raining.png'

    const rain = '/justRain.webp';
    const sun = '/justBlue.webp';
    const brokenCloud = '/brokenClouds.webp';
    const cloud = '/justClouds.webp';
    const clear = '/justClear.webp';

    const backgroudChange = () => {
        console.log('Humidity:', humidity);
        
            if (weather.weather && weather.weather[0] && weather.weather[0].description === "clear sky") {
                setBackground(clear || sun);
            } else if (weather.weather && weather.weather[0] && weather.weather[0].description === "few clouds" || weather.weather && weather.weather[0] && weather.weather[0].description === "overcast clouds") {
                setBackground(brokenCloud);
            } else if (weather.weather && weather.weather[0] && weather.weather[0].description === "scattered clouds"){
                setBackground(cloud);
            }else if(weather.weather && weather.weather[0] && weather.weather[0].description === "light rain"){
                setBackground(rain)
            }else {
                setBackground('/allWeather.webp')
            }
        }

    useEffect(() => {
        backgroudChange();
    }, [humidity]);

    async function press() {
        setLoading(true);

        try {
            const data = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            const result = await data.json()
            setWeather(result)
            console.log(result)

            if (data) {
                setWeather(result)
                setHumidity(result.main.humidity)
                // setTemperature(result.main.temp)
            } else {
                setWeather({})
            }
        } catch (error) {
            console.log('An error occured while fetching', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

    }, [search])



    return (
        <>
            <header style={{ background: `url(${background})` }}>
                <div className="blur">
                    <div>
                        <h1>Weather App</h1>
                        <div className="search">

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Enter A City Or Town"
                            />
                            <button onClick={press}>{loading ? 'Searching' : 'Search'}</button>

                        </div>
                    </div>
                    <div className="info-holder">
                        <div className="image">
                            {weather.weather && weather.weather[0] && weather.weather[0].description === "clear sky" ? (
                                <img src={sunny} alt="partly" />
                            ) : weather.weather && weather.weather[0] && weather.weather[0].description === "scattered clouds" ? (
                                <img src={partly} alt="sunny" />
                            ) : weather.weather && weather.weather[0] && weather.weather[0].description === "broken clouds" ? (
                                <img src={partly} alt="cloudy" />
                            ) : weather.weather && weather.weather[0] && weather.weather[0].description === "few clouds" || weather.weather && weather.weather[0] && weather.weather[0].description === "overcast clouds" ? (
                                <img src={brokenClouds} alt="cloudy" />
                            ) : weather.weather && weather.weather[0] && weather.weather[0].description === "light snow" ? (
                                <img src={cloudy} alt="cloudy" />
                            ) : weather.weather && weather.weather[0] && weather.weather[0].description === "light rain" ? (
                                <img src={raining} alt="cloudy" />
                            ) : <img className="unique-img" src="/collector.png" />
                            }
                        </div>
                        <div className="description">
                            {weather.main ? <>
                                <h4>City/Town: {weather.name}</h4>
                                <h4>Wind Speed: {weather.wind.speed} km/h </h4>
                                <h4>Temperature: {weather.main.temp} &deg;C</h4>
                                <h4>{weather.weather[0].description}</h4>
                                <h4>Humidity: {weather.main.humidity}%</h4>
                                <h4>Country: {weather.sys.country}</h4>
                            </> : 'No City Found'
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default WeatherApp;
