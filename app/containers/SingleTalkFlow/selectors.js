import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the talkFlow state domain
 */
const selectTalkFlowDomain = state => state.get('talkFlow', initialState);

/**
 * Other specific selectors
 */

export const makeSelectFamily = () =>
  createSelector(selectTalkFlowDomain, substate => ({
    name: substate.get('name'),
    uid: substate.get('parentNode'),
    children: substate.get('children'),
    enabled: substate.get('enabled'),
  }));

export const selectEditNode = () =>
  createSelector(selectTalkFlowDomain, state => state.get('editNode'));

export const selectHead = () =>
  createSelector(selectTalkFlowDomain, state => state.get('parentNode'));

export default makeSelectFamily;
