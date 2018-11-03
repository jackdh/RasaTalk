import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the TalkWrapper state domain
 */

const selectTalkWrapperDomain = state => state.get('TalkWrapper', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TalkWrapper
 */

const makeSelectTalkWrapper = () =>
  createSelector(selectTalkWrapperDomain, substate => substate.toJS());

export default makeSelectTalkWrapper;
export { selectTalkWrapperDomain };
