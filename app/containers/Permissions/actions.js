/*
 *
 * Permissions actions
 *
 */

import * as c from './constants';

export const getPermissions = () => ({
  type: c.GET_PERMISSIONS,
});

export const gettingPermissions = toggle => ({
  type: c.GETTING_PERMISSIONS,
  toggle,
});

export const getPermissionsSuccess = permissions => ({
  type: c.GET_PERMISSIONS_SUCCESS,
  permissions,
});

export const getPermissionsFailure = error => ({
  type: c.GET_PERMISSIONS_FAILURE,
  error,
});

export const setPermissions = (group, id, permissions) => ({
  type: c.SET_PERMISSIONS,
  group,
  id,
  permissions,
});

export const settingPermissions = (toggle, group) => ({
  type: c.SETTING_PERMISSIONS,
  toggle,
  group,
});

export const setPermissionsSuccess = permissions => ({
  type: c.SET_PERMISSIONS_SUCCESS,
  permissions,
});

export const setPermissionsFailure = error => ({
  type: c.SET_PERMISSIONS_FAILURE,
  error,
});

export const setUser = (id, setting, permissions) => ({
  type: c.SET_USER,
  id,
  setting,
  permissions,
});

export const setUserSuccess = permissions => ({
  type: c.SET_USER_SUCCESS,
  permissions,
});

export const setUserFailure = error => ({
  type: c.SET_USER_FAILURE,
  error,
});
