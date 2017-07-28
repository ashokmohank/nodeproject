import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql';

import tokenType from '../../types/test/tokenType';
import getProjection from '../../get-projection';
import TokenModel from '../../../model/accessToken';

//import userType from '../../types/user';
//import UserModel from '../../../model/user';

export default {
  type: new GraphQLList(tokenType),
  args: {
    userId: {
      name: 'userId',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    //const projection = getProjection(options.fieldASTs[0]);
    console.log("gql1");
    return TokenModel
      .find()
      //.select(projection)
      .exec();
  }
};
