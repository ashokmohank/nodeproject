// @flow

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

// import User from '../loader/UserLoader';
// import { UserLoader, ViewerLoader } from '../loader';
import UserModel from '../../model/user';
import UserType from '../types/user';
import { userCore } from '../../core';

const {
  nodeField,
  nodeInterface,
} = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);

    // console.log('id, type: ', type, id, globalId);
    if (type === 'User') {
      return userCore.userService.getUserById(id, cb => cb);
    }
    return null;
  },
  // A method that maps from an object to a type
  (obj) => {
    //console.log('obj: ', typeof obj, obj.constructor);
    if (obj instanceof UserModel) {
      return UserType.userType;
    }
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
