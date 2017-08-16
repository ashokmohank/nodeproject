import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

import mutations from './mutations';
import queries from './queries';
import {
  NodeField,
} from './interface/nodeInterface';

// import mutations from './subscriptions';
queries.node = NodeField;
// queries.tests.node = NodeField;
// queries.user.node = NodeField;
// queries.users.node = NodeField;

console.log(queries);

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => (queries),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
});
