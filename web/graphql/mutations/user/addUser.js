
import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import { userCore } from '../../../core';
import userInputType from '../../types/user/userInputType';
// import UserModel from '../../../model/user';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  async resolve (root, params, options) {
    //  const userModelTmp = new UserModel(params.data);
    // const newUser = await userModelTmp.save();
    var newUser = await userCore.userService.createUser(params.data, function(cb) {
      return cb;
    });
    if (!newUser) {
      throw new Error('Error adding new user');
    }
    return true;
  }
};
