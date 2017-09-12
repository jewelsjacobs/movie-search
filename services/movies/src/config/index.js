const path = require('path');

// import .env variables
require('dotenv-safe').load({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  development: path.join(__dirname, '../../.env.example'),
});

// load config files
const app = require('./app');
const logs = require('./logs');

/**
* Exports combined configuration
* @public
*/
module.exports = Object.assign({}, app, logs);
