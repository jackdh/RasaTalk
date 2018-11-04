import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the TalkWrapper state domain
 */

const selectTalkWrapperDomain = state => state.get('talkWrapper', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TalkWrapper
 */

export const makeSelectTalkWrapper = () =>
  createSelector(selectTalkWrapperDomain, substate => substate.toJS());

export default makeSelectTalkWrapper;
