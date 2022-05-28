'use strict';

const axios = require('axios');
let cache = require('./cache.js');

async function getWeather(req, res, next) {

  const lat = req.query.lat;
  const lon = req.query.lon;
  let key = 'weather-' + lat + lon;

  try {
    const cacheTime = 1000 * 60 * 60 * 24;
    if (cache[key] && (Date.now() - cache[key].timestamp < cacheTime)) {
      console.log('Cache hit');
      res.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss');
      let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=5`);
      console.log(weatherResults);
      let weatherData = weatherResults.data.data.map(day => new Forecast(day));
      cache[key] = {
        data: weatherData,
        timestamp: Date.now()
      };
      res.status(200).send(weatherData);
    }
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
