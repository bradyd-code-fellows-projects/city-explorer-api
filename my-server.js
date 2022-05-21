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
// if server is running on port 3002, I know there's a problem with my .env file or how I'm importing it or values in it

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
app.use((e, req, res, next) => {
  res.status(500).send(e.message);
  next(e);
});

// CLASSES

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
