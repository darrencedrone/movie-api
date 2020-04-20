const express = require('express')
const { getAllMovies, getResults, saveNewMovie } = require('./controllers/movies')
const bodyParser = require('body-parser')

const app = express()

app.get('/movies', getAllMovies)

app.get('/movies/:text', getResults)

app.post('/movies', bodyParser.json(), saveNewMovie)

app.listen(1974, () => {
  console.log('Listening on port 1974') //eslint-disable-line no-console
})