import UserModel from '../../model/user';

exports.getUserById = function(userId, callback) {
  console.log('Inside userService getUserById');
  UserModel
    .findOne({_id:userId})
    .lean()
    .exec(function (err, users) {
      return callback(users);
  });
  //return UserModel
    //.findOne({_id:userId})
    //.exec();
}

exports.getUsersById = function(userId, callback) {
  console.log('Inside userService:getUsersById');
  UserModel
    .find({_id:userId})
    .lean()
    .exec(function (err, users) {
      return callback(users);
  });
  //return UserModel
    //.find({_id:userId})
    //.exec();
}

exports.getAllUser = function(callback) {
  console.log('Inside userService:getallUser');
  UserModel.find().lean().exec(function (err, users) {
      return callback(users);
  });
  //return UserModel
  //  .find()
  //  .exec();
}
