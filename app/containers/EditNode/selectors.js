import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editNode state domain
 */
const selectEditNodeDomain = state => state.get('editNode', initialState);

/**
 * Other specific selectors
 */

const selectForm = state => state.get('form');

export const selectActive = () =>
  createSelector(selectForm, state => {
    if (state) return state.has('active');
    return false;
  });

export const hasError = () =>
  createSelector(selectForm, state => {
    if (state.get('EditNode')) return !state.get('EditNode').has('syncErrors');
    return false;
  });

/**
 * Default selector used by EditNode
 */

const makeSelectEditNode = () =>
  createSelector(selectEditNodeDomain, substate => substate.toJS());

export default makeSelectEditNode;
export { selectEditNodeDomain };
