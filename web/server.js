// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
'user strict'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import graphqlHTTP from 'express-graphql';
import db from './db/mongoose';
import { logger, oauth2, auth } from './middleware';
import schema from './graphql';
import router from './router';

const app = express();
// define our app using express
// graphql - added here for schema test


// configure app to use bodyParser()
// this will let us get the data from a POST
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(passport.initialize());

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  console.log(req.method);
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// For testing with graphql UI - To be removed in production
app.use('/graphql', graphqlHTTP({
  schema: schema,
  // rootValue: root,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path
  })
}));
// end of graphql

// Middelwares
app.use('/', (req, res, next) => {
  req.log = logger;
  next();
});

app.all('/token', oauth2.token);
app.all('/graphqlauth', passport.authenticate('bearer', { session: false }));
app.all('/api/*', passport.authenticate('bearer', { session: false }));
app.use('/', router);


module.exports = app;
