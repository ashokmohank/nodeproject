import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import Promise from 'promise';
import userType from '../../types/user/userType';
import getProjection from '../../get-projection';
import UserModel from '../../../model/user';
import {userCore} from '../../../core';

export default {
  type: userType,
  args: {
      id: {
        name: 'id',
        type: GraphQLString
      }
  },
  resolve (root, params, options) {
    //const projection = getProjection(options.fieldASTs[0]);
    //return userCore.userService.getUserById(params.id);
    return new Promise((resolve, reject) => { userCore.userService.getUserById(params.id, function(cb) {
        return resolve(cb);
      })
    });
  }
};
