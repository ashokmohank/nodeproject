import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
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
