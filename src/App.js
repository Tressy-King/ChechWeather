import React from "react";
import WeatherApp from "./fetching/Weather-app";
import WeatherAppLoad from "./fetching/Loader";

function Weather() {
  return (
    <div>
      {/* <WeatherApp/> */}
      <WeatherAppLoad/>
    </div>
  );
}

export default Weather;

