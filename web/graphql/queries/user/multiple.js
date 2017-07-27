import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import Promise from 'promise';
import userType from '../../types/user';
//import UserModel from '../../../model/user';
import {userCore} from '../../../core';

export default {
  type: new GraphQLList(userType),
  args: {
    userId: {
      name: 'userId',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    //return UserModel.find().exec();
    return new Promise((resolve, reject) => { userCore.userService.getAllUser(function(cb) {
        return resolve(cb);
      })
    });
  }
};
