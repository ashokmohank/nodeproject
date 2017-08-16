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
import { NodeInterface } from '../../interface/nodeInterface';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString
    },
    hashedPassword: {
      type: GraphQLString
    },
    username:{
      type: GraphQLString
    },
  }),
  interfaces: () => [NodeInterface],
});
