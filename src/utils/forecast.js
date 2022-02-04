const request = require('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longtiude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4832a4e868c55b13b5f5e612b5eae527&query=${latitude},${longtiude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback('Unable to find Weather Data. Try another Search', undefined);
    } else {
      const weather = response.body.current.temperature;
      const feelsLike = response.body.current.feelslike;
      const weatherDesc = response.body.current.weather_descriptions[0];
      callback(
        undefined,
        `It's currently ${weather} degrees out. It feels like ${feelsLike} degrees out and ${weatherDesc} .`
      );
    }
  });
};

module.exports = forecast;
