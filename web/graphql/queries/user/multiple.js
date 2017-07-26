import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import userType from '../../types/user';
import getProjection from '../../get-projection';
import UserModel from '../../../model/user';

export default {
  type: new GraphQLList(userType),
  args: {
    userId: {
      name: 'userId',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    //const projection = getProjection(options.fieldASTs[0]);

    return UserModel
      .find()
      //.select(projection)
      .exec();
  }
};
