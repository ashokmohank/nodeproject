'use strict'

const express = require('express')
const api = require('./api')
const oauth = require('../middleware/oauth2')

var router = express.Router();          // get an instance of the express Router

// =============================================================================
// middleware to use for all requests
// =============================================================================
router.use(function(req, res, next) {
    // do logging
    console.log('being accessed..'+req.route.path);
    next(); // make sure we go to the next routes and don't stop here
});


// =============================================================================
//Token Generator
// =============================================================================
router.route('/token')
  .post(oauth.token)
// =============================================================================
// API Components
// =============================================================================
// test route to make sure everything is working (accessed at GET http://localhost:8080)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
//Users component
router.route('/api/users')
  .post(api.users.postUsers)
  .get(api.users.getUsers);
//test component - To experiment development
//router.route('/api/test')
//  .get(api.test);
router.route('/api/test/:id')
  .get(api.test);
module.exports = router
