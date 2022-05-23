'use strict';

const axios = require('axios');

async function getWeather(req, res, next) {

  let lat = req.query.lat;
  let lon = req.query.lon;

  try {
    let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=5`);
    let weatherData = weatherResults.data.data;
    let dataToSend = weatherData.map(day => new Forecast(day));
    res.send(dataToSend);

  } catch (e) {
    next(e);
  }
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.low = day.low_temp;
    this.high = day.high_temp;
    this.icon = day.weather.icon;
  }
}

module.exports = getWeather;
