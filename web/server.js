// server.js

// BASE SETUP	
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var passport   = require('passport');
require('./middleware/auth');
var oauth2 = require('./middleware/oauth2');

// Connect to the MongoDB
var db = require('./db/mongoose')

//const middleware = require('./middleware')
const router = require('./router')

// configure app to use bodyParser()
// this will let us get the data from a POST
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(passport.initialize());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  console.log(req.method)
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//logger.info('here')

app.all('/api/*', passport.authenticate('bearer', { session: false }));
app.all('/token', oauth2.token);
app.use('/',router);



module.exports = app
