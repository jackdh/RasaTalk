import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rightSidebar state domain
 */
const selectRightSidebarDomain = state =>
  state.get('rightSidebar', initialState);

/**
 * Other specific selectors
 */

export const selectStatus = () =>
  createSelector(selectRightSidebarDomain, state => state.get('status'));
export const selectInfo = () =>
  createSelector(selectRightSidebarDomain, state => ({
    project: state.get('project'),
    model: state.get('model'),
    q: state.get('q'),
  }));

export const selectParse = () =>
  createSelector(selectRightSidebarDomain, state => ({
    response: state.get('response'),
    sending: state.get('sending'),
  }));

/**
 * Default selector used by RightSidebar
 */

const makeSelectRightSidebar = () =>
  createSelector(selectRightSidebarDomain, substate => substate.toJS());

export default makeSelectRightSidebar;
export { selectRightSidebarDomain };
