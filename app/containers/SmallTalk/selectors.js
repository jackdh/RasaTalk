import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the smallTalk state domain
 */
const selectSmallTalkDomain = state => state.get('smallTalk', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SmallTalk
 */

const makeSelectSmallTalk = () =>
  createSelector(selectSmallTalkDomain, substate => substate.toJS());

export default makeSelectSmallTalk;
export { selectSmallTalkDomain };
