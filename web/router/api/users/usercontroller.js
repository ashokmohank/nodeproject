// Load required packages
var libs = process.cwd() + '/web/';
var User = require(libs + 'model/user');
//var User = require('../../../model/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    //password: req.body.password
    hashedPassword: req.body.hashedPassword,
    salt: 'a'
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Added new user' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  console.log("getusers accessed")
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};