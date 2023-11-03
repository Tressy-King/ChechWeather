import { useState, useEffect } from "react";

const api = {
    key: "9dbcfedf57a26d67bfafad14f76235ad",
    base: 'https://api.openweathermap.org/data/2.5/',
}

const WeatherApp = () => {
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);


    const cloudy = '/cloudy.png'
    const partly = '/partly-cloudy.png'
    const sunny = '/sunny.png'


    async function press() {
        setLoading(true);

        try {
            const data = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            const result = await data.json()
            setWeather(result)
            console.log(result)


            if (data) {
                setWeather(result)
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
            <header>
                <div>
                    <h1>Weather App</h1>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Enter A City Or Town"
                    />
                    <button onClick={press}>{loading ? 'searching' : 'search'}</button>
                </div>

                <div className="info-holder">
                    <div className="image">
                        {weather.main && weather.main.temp < 10 ? (
                            <img src={cloudy} alt="partly" />
                        ) : weather.main && weather.main.temp >= 15 ? (
                            <img src={partly} alt="sunny" />
                        ) : weather.main && weather.main.temp >= 20 ? (
                            <img src={sunny} alt="cloudy" />
                        ) : <img className="unique-img" src="/collector.png"/>
                        
                        }
 
                    </div>
                    <div className="description">
                        {weather.main ? <>
                            <h4>{weather.name}</h4>
                            <h4>Wind Speed: {weather.wind.speed} km/h <img style={{width:'30px', background:'none'}} src="/wind.png"/></h4>
                            <h4>Temperature: {weather.main.temp} &deg;C</h4>
                            <h4>{weather.weather[0].description}</h4>
                            {/* <h4>Humidity: {weather.main.humidity}%</h4> */}
                        </> : 'No City Found'
                        }

                    </div>
                </div>
            </header>
        </>
    );
}

export default WeatherApp;
