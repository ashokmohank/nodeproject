'use strict'

const app = require('./server')

var port = process.env.PORT || 8080;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server Started on port ' + port);
