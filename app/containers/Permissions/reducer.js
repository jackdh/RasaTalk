/*
 *
 * Permissions reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  groups: [],
  roles: [],
  permissions: [],
  users: [],
  loading: true,
  savingRole: false,
  savingGroup: false,
  savingUser: false,
  error: '',
});

function permissionsReducer(state = initialState, action) {
  switch (action.type) {
    case c.GET_PERMISSIONS_SUCCESS:
      return state
        .set('permissions', action.permissions.permissions)
        .set('groups', action.permissions.groups)
        .set('roles', action.permissions.roles)
        .set('users', action.permissions.users);
    case c.GETTING_PERMISSIONS:
      return state.set('loading', action.toggle);
    case c.GET_PERMISSIONS_FAILURE:
      return state.set('error', action.error);
    case c.SETTING_PERMISSIONS:
      switch (action.group) {
        case 'groups':
          return state.set('savingGroup', action.toggle);
        case 'roles':
          return state.set('savingRole', action.toggle);
        case 'users':
          return state.set('savingUser', action.toggle);
        default:
          return state;
      }
    default:
      return state;
  }
}

export default permissionsReducer;
