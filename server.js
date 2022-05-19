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

    let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=5`);
    let weatherData = weatherResults.data.data;
    let dataToSend = weatherData.map(day => new Forecast(day));
    res.send(dataToSend);

  } catch (e) {
    next(e);
  }
});

app.get('/movies', async (req, res, next) => {

  let city_name = req.query.city_name;

  try {

    let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}&include_adult=false`);
    let movieData = movieResults.data.results;
    let dataToSend = movieData.map(movie => new Movie(movie));
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

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.releasedOn = movie.released_date;
  }
}

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
