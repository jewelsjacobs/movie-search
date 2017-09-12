const express = require('express');
const movieRoutes = require('./movie.route');

const router = express.Router();

/**
 * @api {get} /health-check Health Check
 * @apiDescription Check Server
 * @apiVersion 1.0.0
 * @apiName HealthCheck
 * @apiGroup Health
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiExample {curl} Example usage:
 * curl -i http://localhost:3001/health-check
 */
router.get('/health-check', (req, res) => res.send('OK'));

// mount movie routes
router.use('/v1/movies', movieRoutes);

module.exports = router;
