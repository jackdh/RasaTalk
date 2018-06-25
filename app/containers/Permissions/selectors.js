import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the permissions state domain
 */
const selectPermissionsDomain = state => state.get('permissions', initialState);

/**
 * Other specific selectors
 */
export const selectPermissions = () =>
  createSelector(selectPermissionsDomain, substate =>
    substate.get('permissions'),
  );

export const selectRoles = () =>
  createSelector(selectPermissionsDomain, substate => substate.get('roles'));

export const selectGroups = () =>
  createSelector(selectPermissionsDomain, substate => substate.get('groups'));

export const selectUsers = () =>
  createSelector(selectPermissionsDomain, substate => substate.get('users'));

export const selectSavingRoles = () =>
  createSelector(selectPermissionsDomain, substate =>
    substate.get('savingRole'),
  );

export const selectSavingGroups = () =>
  createSelector(selectPermissionsDomain, substate =>
    substate.get('savingGroup'),
  );

export const selectSavingUsers = () =>
  createSelector(selectPermissionsDomain, substate =>
    substate.get('savingUser'),
  );

export default selectPermissionsDomain;
