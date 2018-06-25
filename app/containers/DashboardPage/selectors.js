import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardPage state domain
 */
const selectDashboardPageDomain = state =>
  state.get('dashboardPage', initialState);

/**
 * Other specific selectors
 */

const selectStats = () =>
  createSelector(selectDashboardPageDomain, state => ({
    ...state.get('rasa'),
    ...state.get('stats'),
  }));

/**
 * Default selector used by DashboardPage
 */

const makeSelectDashboardPage = () =>
  createSelector(selectDashboardPageDomain, substate => substate.toJS());

export default makeSelectDashboardPage;
export { selectDashboardPageDomain, selectStats };
