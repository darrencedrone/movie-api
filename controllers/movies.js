const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const textToArray = (txt) => {
  return txt.toLowerCase().split(' ')
}

const getByDirector = (request) => {
  const { text } = request.params

  const matchingMovies = movies.filter(movie => {
    for (let i = 0; i < movie.directors.length; i++) {
      const names = textToArray(movie.directors[i])

      if (names.some(name => name === text)) {
        return true
      }
    }

    return false
  })

  return matchingMovies
}

const getByTitle = (request) => {
  const { text } = request.params

  const matchingMovies = movies.filter(movie => {
    const words = textToArray(movie.title)

    if (words.some(word => word === text)) {
      return true
    }

    return false
  })

  return matchingMovies
}

const getResults = (request, response) => {
  const results = getByDirector(request).concat(getByTitle(request))

  return results.length
    ? response.send(results)
    : response.sendStatus(404)
}

const saveNewMovie = (request, response) => {
  const { title, directors, releaseDate, rating, runTime, genres } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response.status(400).send('One of the following fields is missing: title, directors, releaseDate, rating, runTime, genres') // eslint-disable-line max-len
  }

  const newMovie = { title, directors, releaseDate, rating, runTime, genres }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getResults, saveNewMovie }
