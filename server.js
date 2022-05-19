'use strict';

// REQUIRE

require('dotenv').config();
const express = require('express');
const cors = require('cors');
let data = require('./data/weather.json');
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

app.get('/weather', (req, res, next) => {
  try {
    let city = req.query.city;

    let searchedCity = data.find(location => location.city_name.toLowerCase() === city.toLowerCase());

    if (searchedCity === undefined) {
      response.send('No weather data available');
    } else {
      let dataToSend = [];
      searchedCity.data.map(weatherInfo => {
        let description = weatherInfo.weather.description;
        let dateTime = weatherInfo.datetime;
        dataToSend.push(new Forecast(description, dateTime));
      });
      res.send(dataToSend);
    }
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
  constructor(description, dateTime) {
    this.date = dateTime;
    this.description = description;
  }
}

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
