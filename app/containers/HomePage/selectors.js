/**
 * Homepage selectors
 *
 * TODO research what these selectors are.
 */

import find from 'lodash/find';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the training state domain
 */
const selectHome = state => state.get('home', initialState);

/**
 * Other specific selectors
 */
const makeSelectTitle = () =>
  createSelector(selectHome, homeState => homeState.get('title'));

const selectUser = () => createSelector(selectHome, state => state.get('user'));

const selectOpen = () =>
  createSelector(selectHome, state => ({
    open: state.get('snackBarOpen'),
    props: state.get('snackbarProps'),
  }));

const selectMessage = () =>
  createSelector(selectHome, state => state.get('snackBarMessage'));

const selectAgents = () =>
  createSelector(selectHome, state => state.get('agents'));

const selectTalkWrapper = agent =>
  createSelector(selectHome, s => find(s.get('talkWrappers'), { _id: agent }));

const selectTalkWrappers = () =>
  createSelector(selectHome, s => s.get('talkWrappers'));

const selectAddingTalkWrappers = () =>
  createSelector(selectHome, s => s.get('addingTalkWrappers'));

export {
  selectHome,
  makeSelectTitle,
  selectUser,
  selectOpen,
  selectMessage,
  selectAgents,
  selectTalkWrapper,
  selectTalkWrappers,
  selectAddingTalkWrappers,
};
