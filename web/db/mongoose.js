var mongoose = require('mongoose');
var config = require('config');
var dbConfig = config.get('nodeproject.dbConfig.url');

mongoose.connect(dbConfig);

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Connection error:', err.message);
});

db.once('open', function callback () {
	console.log("Connected to DB!");
});

module.exports = mongoose;
