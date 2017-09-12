const httpStatus = require('http-status');
const Movie = require('../models/movie.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Create new movie
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.status(httpStatus.CREATED);
    res.json(savedMovie.transform());
  } catch (error) {
    next(errorHandler(error, req, res));
  }
};

/**
 * Get movie list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const movies = await Movie.list(req.params);
    const transformedMovies = movies.map(movie => movie.transform());
    res.json(transformedMovies);
  } catch (error) {
    next(errorHandler(error, req, res));
  }
};
