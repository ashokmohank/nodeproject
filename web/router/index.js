'use strict'
import graphqlHTTP from 'express-graphql';
import schema from '../graphql';
import { graphql } from 'graphql';

const express = require('express')
const api = require('./api')
const oauth = require('../middleware/oauth2')


var router = express.Router(); // get an instance of the express Router

// =============================================================================
// middleware to use for all requests
// =============================================================================
router.use(function (req, res, next) {
// custom console
  console.log('being accessed..'+req.route.path);
  next(); // make sure we go to the next routes and don't stop here
});


// =============================================================================
// Token Generator
// =============================================================================
router.route('/token')
  .post(oauth.token);
// =============================================================================
// API Components
// =============================================================================
// test route to make sure everything is working (accessed at GET http://localhost:8080)
router.get('/',function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
// Users component
console.log(api);
router.route('/api/users')
  .post(api.users.postUsers)
  .get(api.users.getUsers);
// graphql component
router.use('/graphqlauth0', graphqlHTTP({
  schema: schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path
  })
}));

router.post('/graphqlauth', (req, res) => {
  let query = '';
  let variables = {};
  if (typeof req.body === 'string') {
    query = req.body;
  } else if (typeof req.body === 'object') {
    query = req.body.query;
    variables = req.body.variables;
  }
  try {
    graphql(schema, query, {}, {}, variables)
      .then(result => res.status(200)
        .json(result))
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    console.log(e);
    res.status(500)
      .send(e.message);
  }
});
// test component - To experiment development
// router.route('/api/test')
router.route('/api/test/:id')
  .get(api.test);

module.exports = router;
