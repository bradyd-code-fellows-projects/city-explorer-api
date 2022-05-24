'use strict';

const axios = require('axios');
let cache = require('./cache.js');

async function getMovies(req, res, next) {

  let city_name = req.query.city_name;
  const key = 'moviedb-' + city_name;

  if (cache[key] && ((Date.now() - cache[key].timestamp) < (1000 * 60 * 60 * 24 * 30))) {
    try {
      console.log('Cache hit');
      let movieResults = cache[city_name];
      console.log(movieResults);
      let movieData = movieResults.data;
      let dataToSend = movieData.map(movie => new Movie(movie));
      res.status(200).send(dataToSend);
    } catch (e) {
      next(e);
    }
  } else {
    try {
      console.log('Cache miss');
      let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}&include_adult=false`);
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movieResults;
      let movieData = movieResults.data.results;
      let dataToSend = movieData.map(movie => new Movie(movie));
      res.status(200).send(dataToSend);
    } catch (e) {
      next(e);
    }
  }
}

class Movie {
  constructor(movie) {
    this.image_url =
      this.posterpath = movie.posterpath;
    this.title = movie.title;
    this.overview = movie.overview;
    this.releasedOn = movie.released_date;
  }
}

module.exports = getMovies;
