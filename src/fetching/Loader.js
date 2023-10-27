import React, { useState } from 'react';

const api = {
    key: "9dbcfedf57a26d67bfafad14f76235ad",
    base: 'https://api.openweathermap.org/data/2.5/',
}

const WeatherAppLoad = () => {
    const [forSearch, setForSearch] = useState('');
    const [forWeather, setForWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const searchPress = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${api.base}weather?q=${forSearch}&units=metric&APPID=${api.key}`);
            const data = await response.json();

            if (data.cod === 200) {
                setForWeather(data);
            } else {
                setForWeather({});
            }
        } catch (error) {
            console.log('Failed to fetch data', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='carrier'>
            <header>
                <h1>Weather App</h1>
                <div className='info-holder'>
                    <input
                        type='text'
                        placeholder='Enter City/Town'
                        value={forSearch}
                        onChange={(e) => setForSearch(e.target.value)}
                    />
                    <button onClick={searchPress} disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
                {forWeather.main ? (
                    <>
                        <h3>{forWeather.name}</h3>
                        <h3>{forWeather.main.temp} &deg;C </h3>
                        <h3>{forWeather.weather[0].description}<h4>Wind Speed: {forWeather.wind.speed}</h4></h3>
                    </>
                ) : (
                    <h3>No city found</h3>
                )}
            </header>
        </div>
    );
}

export default WeatherAppLoad;
