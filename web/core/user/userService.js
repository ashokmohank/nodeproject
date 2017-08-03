import Promise from 'promise';
import UserModel from '../../model/user';

exports.getUserById = function getUserById(userId, callback) {
  console.log('Inside userService getUserById');
  UserModel
    .findOne({ _id: userId })
    .lean()
    .exec((err, users) => callback(users));
  // return UserModel
  // .findOne({_id:userId})
  // .exec();
};

exports.getUsersById = function getUsersById(userId, callback) {
  console.log('Inside userService:getUsersById');
  UserModel
    .find({ _id: userId })
    .lean()
    .exec((err, users) => callback(users));
  // return UserModel
  // .find({_id:userId})
  // .exec();
};

exports.getAllUser = function getAllUser(callback) {
  console.log('Inside userService:getallUser');
  UserModel
    .find()
    .lean()
    .exec((err, users) => callback(users));
  // return UserModel
  //  .find()
  //  .exec();
};

exports.createUser = function createUser(data, callback) {
  console.log('Inside userService:createUser');
  const userModelTmp = new UserModel(data);
  return new Promise((resolve, reject) => {
    userModelTmp.save((err, users) => resolve(users))
  });
};
