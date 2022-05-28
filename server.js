'use strict';

// REQUIRE

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

// USE

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello from my server');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

// catch all "star route"
app.get('*', (req, res) => {
  res.send('The thing you are looking for doesn\'t exist');
});

// ERRORS

// CLASSES

//LISTEN

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
