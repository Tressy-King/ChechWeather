import React, { useState } from 'react';

const api = {
    key: "9dbcfedf57a26d67bfafad14f76235ad",
    base: 'https://api.openweathermap.org/data/2.5/',
}

const WeatherApp = () => {
    const [forSearch, setForSearch] = useState('');
    const [forWeather, setForWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const searchPress = () => {
        try {
            async function collector() {
                const data = await fetch(`${api.base}weather?q=${forSearch}&units=metric&APPID=${api.key}`)
                const res = await data.json()
                setForWeather(res)
                console.log(res)
            }
            collector()

        } catch (error) {
            console.log('failed to fetch data', error)
        }
    }


    return (
        <>
            <div className='carrier'>
                <header>
                    <h1>Weather App</h1>
                    <div className='info-holder'>
                        <input
                            type='text'
                            placeholder='Enter City/Town'
                            onChange={(e) => setForSearch(e.target.value)}
                        />
                        <button onClick={searchPress}>Search</button>
                    </div>
                    {forWeather.main ? <><h3>{forWeather.name}</h3>
                        <h3>{forWeather.main.temp} &deg;C </h3>
                        <h3>{forWeather.weather[0].description}<h4>Wind Speed: {forWeather.wind.speed}</h4></h3></> : <h3>No city found</h3>}

                </header>
            </div>
        </>
    );
}

export default WeatherApp;