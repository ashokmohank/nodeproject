'use strict'

const express = require('express')

const api = require('./api')

const oauth = require('../middleware/oauth2')

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('being accessed..');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

//Token Generator
router.route('/token')
  .post(oauth.token)

//router.get('/api/user', api.users.get);
router.route('/api/users')
  .post(api.users.postUsers)
  .get(api.users.getUsers);



module.exports = router
