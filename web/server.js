// server.js

// BASE SETUP	
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var passport   = require('passport');
var authController = require('./middleware/auth');

// Connect to the MongoDB
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-8pkak.mongodb.net:27017,cluster0-shard-00-01-8pkak.mongodb.net:27017,cluster0-shard-00-02-8pkak.mongodb.net:27017/security?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');


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

//app.all('/api/*', [require('./middleware/auth')]);
app.all('/api/*', authController.isAuthenticated);
app.use('/',router);



module.exports = app
