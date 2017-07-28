import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {Types} from 'mongoose';

import tokenType from '../../types/test/tokenType';
import getProjection from '../../get-projection';
import TokenModel from '../../../model/accessToken';

export default {
  type: tokenType,
  args: {
    userId: {
      name: 'userId',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    //const projection = getProjection(options.fieldASTs[0]);

    return TokenModel
      //.findById(params.id)
      .findOne({ userId: params.userId })
      //.find()
      //.select(projection)
      .exec();
  }
};
