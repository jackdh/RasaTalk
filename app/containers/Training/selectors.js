import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the training state domain
 */
const selectTrainingDomain = state => state.get('training', initialState);

/**
 * Other specific selectors
 */

export const selectAgents = () =>
  createSelector(selectTrainingDomain, state => state.get('agents'));
export const selectLoading = () =>
  createSelector(selectTrainingDomain, state => state.get('loading'));
export const selectGetting = () =>
  createSelector(selectTrainingDomain, state => state.get('getting'));
export const selectJSON = () =>
  createSelector(selectTrainingDomain, state => state.get('json'));
export const selectTraining = () =>
  createSelector(selectTrainingDomain, state => state.get('training'));
export const selectInTraining = () =>
  createSelector(selectTrainingDomain, state => state.get('inTraining'));

/**
 * Default selector used by Training
 */

const makeSelectTraining = () =>
  createSelector(selectTrainingDomain, substate => substate.toJS());

export default makeSelectTraining;
export { selectTrainingDomain };
