const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/movie.controller');
const {
  createMovie,
} = require('../../validations/movie.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} /v1/movies Create Movie
   * @apiDescription Create a new movie
   * @apiVersion 1.0.0
   * @apiName CreateMovies
   * @apiGroup Movie
   *
   * @apiParam  {String}                 title          The title of the movie
   * @apiParam  {String}                 poster         The poster url of the movie
   * @apiParam  {String}                 key         The IMDB id
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "title": "The Matrix",
   *       "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
   *       "key": "tt0133093"
   *     }
   *
   * @apiError (Bad Request 400)   ValidationError
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 400 ValidationError
   *     {
   *       "code": 400,
   *       "message": "Validation Error",
   *       "errors": [
   *         {
   *           "field": "title",
   *           "location": "body",
   *           "messages": [
   *             "\"title\" must be a string"
   *           ],
   *           "types": [
   *             "string.base"
   *           ]
   *         }
   *       ]
   *     }
   *
   * @apiExample {curl} Example usage:
   * curl -H "Content-Type: application/json" -X POST -d '{"title": "The Matrix", "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", "key": "tt0133093"}' http://localhost:3000/v1/movies
   */
  .post(validate(createMovie), controller.create)
  /**
   * @api {get} /v1/movies List Movies
   * @apiDescription Get a list of movies
   * @apiVersion 1.0.0
   * @apiName ListMovies
   * @apiGroup Movie
   *
   * @apiSuccess {Object[]} movies List of movies.
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [
   *      {
   *        "title": "Top Gun",
   *        "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
   *         "key": "tt0092099"
   *      },
   *      {
   *         "title": "The Matrix",
   *         "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
   *         "key": "tt0133093"
   *       }
   *     ]
   *
   * @apiExample {curl} Example usage:
   * curl -i http://localhost:3000/v1/movies
   *
   */
  .get(controller.list);

module.exports = router;
