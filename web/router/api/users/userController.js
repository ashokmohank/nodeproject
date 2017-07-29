// Load required packages
import { userCore } from '../../../core';

var libs = process.cwd() + '/web/';
var User = require(libs + 'model/user');

//var User = require('../../../model/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  console.log(req.body);
  var userData = {
    username: req.body.username,
    // password: req.body.password
    hashedPassword: req.body.hashedPassword
  };
  userCore.userService.createUser(userData, function(cb) {
    return cb;
  }).then(res.json({ message: 'Added new user' })) ;
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  // callback
  userCore.userService.getAllUser(function(cb) {
    res.json(cb);
  });
  /*  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  }); */
};
