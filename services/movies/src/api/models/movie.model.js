const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

/**
 * Movie Schema
 * @private
 */
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

/**
 * Methods
 */
movieSchema.method({

  /**
   * Takes parameters from the request body and transforms into object
   * @returns {{}}
   */
  transform() {
    const transformed = {};
    const fields = ['title', 'poster', 'key'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

});

/**
 * Statics
 * @see {@url http://mongoosejs.com/docs/guide.html#statics}
 */
movieSchema.statics = {

  /**
   * Get Movie
   *
   * @param {String} title - The title of the movie.
   * @returns {Promise<Movie, APIError>}
   */
  async get(title) {
    try {
      const movies = await this.findOne({ title }).exec();

      if (movies) {
        return movies;
      }

      throw new APIError({
        movie: 'Movie does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List movies.
   *
   * @returns {Promise<Movie[]>}
   */
  list() {
    return this.find({});
  },

};

/**
 * @typedef Movie
 */
module.exports = mongoose.model('Movie', movieSchema);
