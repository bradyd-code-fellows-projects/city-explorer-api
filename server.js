'use strict';

console.log('My first server');

// REQUIRE
// in order to use something servers need to be told to require it and then use it. React does this in one step(import), Express needs two

// to create a server we are bringing in Express
const express = require('express');

let data = require('/data/data.json');

// we need to bring in our .env file, so we'll use this after we have npm i dotenv
require('dotenv').config();

// USE
// once we require something we need to use it.
// this is where we assign the required file a name (variable)

// once we have express we must USE express
const app = express();

app.use(cors());

// define PORT and validate that .env is working
const PORT = process.env.PORT || 3002;
// if server is running on port 3002, I know there's a problem with my .env file or how I'm importing it or values in it

// ROUTES
// we need to declare end points

// our basic default route:
// app.get corrolates to axios.get
// two arguments: the URL in quotes, and a callback function
// this gets called our "slash route"
app.get('/', (request, response) => {
  response.send('hello from my server');
});

app.get('/hello', (request, response) => {
  response.send('hello');
});

app.get('/pets', (request, response) => {
  let reqSpecies = request.query.species;
  let dataToSend = data.find(pet => pet.species === reqSpecies);
  response.send(dataToSend);
});

// catch all "star route"
app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

// ERRORS
// handle errors

// CLASSES
class Pet {

}

//LISTEN
// start the server
// listen is an Express method that takes in 2 arguments: a port value and a callback function

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
