import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the thirdParty state domain
 */

const selectThirdPartyDomain = state => state.get('thirdParty', initialState);

/**
 * Other specific selectors
 */

const selectFacebook = () =>
  createSelector(selectThirdPartyDomain, s => s.get('facebook').toJS());

const selectSlack = () =>
  createSelector(selectThirdPartyDomain, s => s.get('slack').toJS());

/**
 * Default selector used by ThirdParty
 */

const makeSelectThirdParty = () =>
  createSelector(selectThirdPartyDomain, substate => substate.toJS());

export default makeSelectThirdParty;
export { selectThirdPartyDomain, selectFacebook, selectSlack };
