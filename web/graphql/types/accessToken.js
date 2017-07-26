import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';

import userType from './user';
import UserModel from '../../model/user';
export default new GraphQLObjectType({
  name: 'accessToken',
  fields: {
    userId: {
      type: new GraphQLList(userType)
      ,resolve (root, params, options) {
        //const projection = getProjection(options.fieldASTs[0]);
        console.log(root)
        return UserModel
          .find({_id:root.userId})
          //.select(projection)
          .exec();
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
