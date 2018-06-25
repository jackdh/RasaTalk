/**
 * Homepage selectors
 *
 * TODO research what these selectors are.
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

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

const selectProps = () =>
  createSelector(selectHome, state => state.get('snackbarProps'));

export {
  selectHome,
  makeSelectUsername,
  makeSelectTitle,
  selectUser,
  selectOpen,
  selectMessage,
  selectProps,
};
