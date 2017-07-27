import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';

import Promise from 'promise';
import userType from './user';
import UserModel from '../../model/user';
import {userCore} from '../../core';

export default new GraphQLObjectType({
  name: 'accessToken',
  fields: {
    userId: {
      type: new GraphQLList(userType)
      ,resolve (root, params, options) {
        return new Promise((resolve, reject) => { userCore.userService.getUsersById(root.userId, function(cb) {
            return resolve(cb);
          })
        });
        /*return UserModel
          .find({_id:root.userId})
          //.select(projection)
          .exec();*/
      }
    },
    token: {
      type: GraphQLString
    },
    clientId:{
      type: GraphQLString
    }
  }
});
