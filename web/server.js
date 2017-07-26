// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var passport   = require('passport');
import {buildSchema} from 'graphql';
import graphqlHTTP from 'express-graphql';
import schema from './graphql';
import {logger, oauth2, auth} from './middleware'
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
//graphql
// Construct a schema, using GraphQL schema language
/*var schema1 = buildSchema(`
  type Query {
    hello: String,
    test: String,
    nothing : String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  test: () => {
    return 'test world!';
  }
};
*/
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //rootValue: root,
  graphiql: true,
  formatError: error => ({
  message: error.message,
  locations: error.locations,
  stack: error.stack,
  path: error.path
})
}));

//end of graphql
app.use('/', function (req, res, next) {
    req.log = logger;
    next();
});
app.all('/api/*', passport.authenticate('bearer', { session: false }));
app.all('/token', oauth2.token);
app.use('/',router);



module.exports = app
