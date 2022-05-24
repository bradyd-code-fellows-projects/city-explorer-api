'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getWeather(lat, lon) {

  const key = 'weather-' + lat + lon;

  if (cache[key] && ((Date.now() - cache[key].timestamp) < (1000 * 60 * 60 * 24))) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=5`)
      .then(response => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
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

