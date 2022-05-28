'use strict';

const axios = require('axios');
let cache = require('./cache.js');

async function getMovies(req, res, next) {

  let city_name = req.query.city_name;
  const key = 'moviedb-' + city_name;

  try {
    const cacheTime = 1000 * 60 * 60 * 24 * 30;
    if (cache[key] && (Date.now() - cache[key].timestamp < cacheTime)) {
      console.log('Cache hit');
      res.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss');
      let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}&include_adult=false`);
      let movieData = movieResults.data.results.map(movie => new Movie(movie));
      cache[key] = {
        data: movieData,
        timestamp: Date.now()
      };
      res.status(200).send(movieData);
    }
  } catch (e) {
    next(e);
  }
}

class Movie {
  constructor(movie) {
    this.image_url = (movie.poster_path !== null) ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : `https://unsplash.com/photos/Dnkr_lmdKi8`;
    this.title = movie.title;
    this.overview = movie.overview;
    this.releasedOn = movie.released_date;
  }
}

module.exports = getMovies;
