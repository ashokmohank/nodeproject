import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
//import {Types} from 'mongoose';

import userType from '../../types/user';
import getProjection from '../../get-projection';
import UserModel from '../../../model/user';

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

    return UserModel
      //.findById(params.id)
      .findOne({ _id: params.id })
      //.find()
      //.select(projection)
      .exec();
  }
};
