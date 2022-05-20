'use strict';

const axios = require('axios');

async function getMovies (req, res, next) {

  let city_name = req.query.city_name;

  try {

    let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}&include_adult=false`);
    let movieData = movieResults.data.results;
    let dataToSend = movieData.map(movie => new Movie(movie));
    res.send(dataToSend);
  } catch (e) {
    next(e);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.releasedOn = movie.released_date;
  }
}

module.exports = getMovies;
