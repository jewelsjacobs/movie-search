const Joi = require('joi');

module.exports = {
  // POST /v1/movies
  createMovie: {
    body: {
      title: Joi.string().required(),
      poster: Joi.string().required(),
      key: Joi.string().required(),
    },
  },
};
