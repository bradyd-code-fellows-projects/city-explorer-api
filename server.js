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

app.get('/weather', weatherHandler);

app.get('/movies', getMovies);

// catch all "star route"
app.get('*', (req, res) => {
  res.send('The thing you are looking for doesn\'t exist');
});

function weatherHandler(req, res) {
  const { lat, lon } = req.query;
  getWeather(lat, lon)
    .then(dataToSend => res.send(dataToSend))
    .catch((e) => {
      console.error(e);
      res.status(500).send('Something went wrong');
    });
}

// ERRORS

// CLASSES

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
