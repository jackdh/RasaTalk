import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the nodeWrapper state domain
 */

const selectNodeWrapperDomain = state => state.get('nodeWrapper', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NodeWrapper
 */

const makeSelectNodeWrapper = () =>
  createSelector(selectNodeWrapperDomain, substate => substate.toJS());

export default makeSelectNodeWrapper;
export { selectNodeWrapperDomain };
