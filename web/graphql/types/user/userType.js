import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

import {
  globalIdField,
  connectionArgs,
  fromGlobalId,
} from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    _id: {
      type: GraphQLString
    },
    hashedPassword: {
      type: GraphQLString
    },
    username:{
      type: GraphQLString
    }
  }
});
