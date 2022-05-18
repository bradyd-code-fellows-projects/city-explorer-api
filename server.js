'use strict';

console.log('My first server');

// REQUIRE

const express = require('express');

let data = require('./data/weather.json');

require('dotenv').config();

// USE

const app = express();

// app.use(cors());

const PORT = process.env.PORT || 3002;
// if server is running on port 3002, I know there's a problem with my .env file or how I'm importing it or values in it

// ROUTES

app.get('/', (request, response) => {
  response.send('Hello from my server');
});

app.get('/hello', (request, response) => {
  response.send('hello');
});

app.get('/weather', (request, response) => {
  let cityData = request.query.city_name;
  let reqWeather = data.find(weather => weather.city_name === cityData);
  let dataToSend = new Forecast(reqWeather);
  response.send(dataToSend);
  console.log(dataToSend);
});

// catch all "star route"
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// ERRORS
// handle errors

// CLASSES

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
