import redis from 'redis';
import Promise from 'promise';
import UserModel from '../../model/user';
import pub from '../../broker/rabbitmq/publish';
import sub from '../../broker/rabbitmq/subscribe';

const config = require('config');

const redisHost = config.get('nodeproject.cacheConfig.host');
const redisPort = config.get('nodeproject.cacheConfig.port');
const cacheClient = redis.createClient(redisPort, redisHost);

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
  cacheClient.get('allusers', (error, allusers) => {
    if (error) { throw error; }
    if (allusers) {
      // const p = pub.publishMessage('ex', 'message from user', 'routingKey');
      const s = sub.subscribeMessage('ex', 'routingKey', cb => console.log(cb));
      callback(JSON.parse(allusers));
      console.log('cache userService:getallUser');
    } else {
      console.log('Inside userService:getallUser');
      UserModel
        .find()
        .lean()
        .exec((err, users) => {
          cacheClient.set('allusers', JSON.stringify(users), (errorSet) => {
            if (errorSet) { throw errorSet; }
          });
          callback(users);
        });
      // return UserModel
      //  .find()
      //  .exec();
    }
  });
};

exports.createUser = function createUser(data, callback) {
  console.log('Inside userService:createUser');
  const userModelTmp = new UserModel(data);
  return new Promise((resolve, reject) => {
    userModelTmp.save((err, users) => resolve(users));
  });
};
