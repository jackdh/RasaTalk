import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sidebar state domain
 */
const selectSidebarDomain = state => state.get('sidebar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sidebar
 */

const makeSelectSidebar = () =>
  createSelector(selectSidebarDomain, substate => substate.toJS());

export default makeSelectSidebar;
export { selectSidebarDomain };
