import { useState, useEffect } from "react";

const api = {
    key: "9dbcfedf57a26d67bfafad14f76235ad",
    base: 'https://api.openweathermap.org/data/2.5/',
}

const WeatherApp = () => {
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState('');
    const [loading, setLoading] = useState(false);
    const [background, setBackground] = useState('weather-app/public/sunny.webp');
    const [humidity, setHumidity] = useState(null);

    const cloudy = '/cloudy.png';
    const partly = '/partly-cloudy.png';
    const sunny = '/sunny.png';
    const rain = 'weather-app/public/rain.webp';
    const sun = 'weather-app/public/sunny.webp';
    const cloud = 'weather-app/public/cloudy.webp';

    const backgroudChange = () => {
        if (humidity !== null) {
            if (humidity < 30) {
                setBackground(rain);
            } else {
                setBackground(sun);
            }
        }
    }

    useEffect(() => {
        backgroudChange();
    }, [humidity]);

    async function press() {
        setLoading(true);

        try {
            const data = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`);
            const res = await data.json();
            console.log(res);

            if (data) {
                setHumidity(res.main.humidity);
                setWeather(res.name);
                console.log(res.name + " is " + res.main.humidity);
            } else {
                setWeather({});
            }

        } catch (error) {
            console.log('Error while trying to fetch', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <header style={{ background: `url(${background})`}}>
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
                        <img src={partly} alt="" />
                    </div>
                    <div className="description">
                        <h4>{weather}</h4>
                        <h4>City/Town to be shown here</h4>
                        <h4>Temperature to be shown here</h4>
                        <h4>Humidity to be shown here</h4>
                        <h4>Wind speed to be shown here</h4>
                    </div>
                </div>
            </header>
        </>
    );
}

export default WeatherApp;
