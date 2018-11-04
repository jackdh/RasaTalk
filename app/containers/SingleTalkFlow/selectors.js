import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the talkFlow state domain
 */
const stfd = state => state.get('talkFlow', initialState);

/**
 * Other specific selectors
 */

export const makeSelectFamily = () =>
  createSelector(stfd, substate => ({
    name: substate.get('name'),
    uid: substate.get('parentNode'),
    children: substate.get('children'),
    enabled: substate.get('enabled'),
  }));

export const selectEditNode = () =>
  createSelector(stfd, state => state.get('editNode'));

export const selectTalkWrapper = () =>
  createSelector(stfd, s => s.get('talkWrapper'));

export const selectHead = () =>
  createSelector(stfd, state => state.get('parentNode'));

export default makeSelectFamily;
