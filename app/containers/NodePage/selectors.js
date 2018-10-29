import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the intentPage state domain
 */
const selectIntentPageDomain = state => state.get('intentPage', initialState);

/**
 * Other specific selectors
 */

// const selectAgent = () => createSelector(
//   selectIntentPageDomain,
//   (substate) => substate.get('agent'),
// );

/**
 * Default selector used by NodePage
 */

const makeSelectIntentPage = () =>
  createSelector(selectIntentPageDomain, substate => substate.toJS());

const selectAgent = () =>
  createSelector(selectIntentPageDomain, substate => substate.get('agent'));

export default makeSelectIntentPage;
export { selectIntentPageDomain, selectAgent };
