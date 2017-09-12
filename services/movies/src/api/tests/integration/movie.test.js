/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const { some, omitBy, isNil } = require('lodash');
const app = require('../../../index');
const Movie = require('../../models/movie.model');

/**
 * root level hooks
 */

async function format(movie) {
  // get movies from database
  const dbMovie = (await Movie.findOne({ title: movie.title })).transform();

  // remove null and undefined properties
  return omitBy(dbMovie, isNil);
}

describe('Movie API', () => {
  let dbMovies;
  let movie;

  beforeEach(async () => {
    dbMovies = {
      movieOne: {
        title: "The Matrix",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        key: "tt0133093"
      },
      movieTwo: {
        title: "Top Gun",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
        key: "tt0092099"
      },
      movieThree: {
        title: "Guardians of the Galaxy Vol. 2",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg",
        key: "tt3896198"
      },
      movieFour: {
        title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNTkxYjUxNDYtZGY0My00NTc2LThiZmYtNmNmNmU0NGVkZWYwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        key: "tt0057012"
      },
    };

    movie = {
      title: "Top Gun",
      poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BZjQxYTA3ODItNzgxMy00N2Y2LWJlZGMtMTRlM2JkZjI1ZDhhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
      key: "tt0092099",
    };

    await Movie.remove({});
    await Movie.insertMany([
      dbMovies.movieOne,
      dbMovies.movieTwo,
      dbMovies.movieThree,
      dbMovies.movieFour,
    ]);
  });

  describe('POST /v1/movies', () => {
    it('should create a new movie when request is ok', () => {
      return request(app)
        .post('/v1/movies')
        .send(movie)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(movie);
        });
    });
  });

  describe('GET /v1/movies', () => {
    it('should get all saved movies', () => {
      return request(app)
        .get('/v1/movies')
        .expect(httpStatus.OK)
        .then((res) => {
          const movie = format(dbMovies.movieTwo);
          const includesMovie = some(res.body, movie);

          expect(res.body).to.have.lengthOf(4);
          expect(includesMovie).to.be.true;
        });
    });
  });
});
