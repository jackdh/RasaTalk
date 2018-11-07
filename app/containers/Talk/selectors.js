import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the talk state domain
 */
const selectTalk = state => state.get('talk', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Talk
 */

const makeSelectTalk = () =>
  createSelector(selectTalk, substate => substate.toJS());

const selectParents = () =>
  createSelector(selectTalk, state => state.get('parents'));

const selectLoading = () =>
  createSelector(selectTalk, state => state.get('loading'));

const selectUpdating = () =>
  createSelector(selectTalk, state => state.get('updating'));

export default makeSelectTalk;
export { selectTalk, selectParents, selectLoading, selectUpdating };
