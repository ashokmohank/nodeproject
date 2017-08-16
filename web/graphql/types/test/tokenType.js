import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';
import {
  globalIdField,
  connectionArgs,
  connectionFromArray,
  fromGlobalId,
} from 'graphql-relay';

import Promise from 'promise';
import userType from '../user/userType';
import UserModel from '../../../model/user';
import {userCore} from '../../../core';

import { NodeInterface } from '../../interface/nodeInterface';
import UserConnection from '../../connections/userConnection';

export default new GraphQLObjectType({
  name: 'accessToken',
  fields: () => ({
    id: globalIdField('accessToken'),
    userId: {
      type: new GraphQLList(userType),
      resolve(root, params, options) {
        return new Promise((resolve, reject) => {
          userCore.userService.getUsersById(root.userId, cb => resolve(cb));
        });
        /* return UserModel
          .find({_id:root.userId})
          //.select(projection)
          .exec(); */
      },
    },
    token: {
      type: GraphQLString
    },
    clientId: {
      type: GraphQLString
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        }
      },
      resolve: (obj, args, context) => {
        console.log(obj.userId);
        return new Promise((resolve, reject) => {
          userCore.userService.getUserById(obj.userId, cb => resolve(cb));
        });
      },
    },
  }),
  interfaces: () => [NodeInterface],

});
