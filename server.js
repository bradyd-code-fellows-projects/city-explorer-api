'use strict';

// REQUIRE

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// USE

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
// if server is running on port 3002, I know there's a problem with my .env file or how I'm importing it or values in it

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello from my server');
});

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.get('/weather', async (req, res, next) => {

  let lat = req.query.lat;
  let lon = req.query.lon;

  try {

    let url = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_API_KEY}&units=I&days=5`);
    let weatherData = url.data.data;
    let dataToSend = weatherData.map( day => new Forecast(day));
    res.send(dataToSend);

  } catch (e) {
    next(e);
  }
});

// catch all "star route"
app.get('*', (req, res) => {
  res.send('The thing you are looking for doesn\'t exist');
});

// ERRORS
app.use((e, req, res, next) => {
  res.status(500).send(e.message);
  next(e);
});

// CLASSES

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.low = day.low_temp;
    this.high = day.high_temp;
  }
}

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
