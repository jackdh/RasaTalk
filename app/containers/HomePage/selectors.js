/**
 * Homepage selectors
 *
 * TODO research what these selectors are.
 */

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

export {
  selectHome,
  makeSelectTitle,
  selectUser,
  selectOpen,
  selectMessage,
  selectAgents,
};
