'use strict'

const app = require('./server')
const config = require('config');

const port = config.get('nodeproject.server.port') || 8080; // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server Started on port ' + port);
