var bunyan     = require('bunyan')
var logger     = bunyan.createLogger({name: 'myapp'});

module.exports = logger;

