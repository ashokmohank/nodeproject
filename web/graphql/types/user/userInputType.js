
import {
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: {
    _id: {
      type: GraphQLString
    },
    hashedPassword: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    salt: {
      type: GraphQLString
    }
  }
});
