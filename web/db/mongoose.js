var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-8pkak.mongodb.net:27017,cluster0-shard-00-01-8pkak.mongodb.net:27017,cluster0-shard-00-02-8pkak.mongodb.net:27017/security?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Connection error:', err.message);
});

db.once('open', function callback () {
	console.log("Connected to DB!");
});

module.exports = mongoose;
