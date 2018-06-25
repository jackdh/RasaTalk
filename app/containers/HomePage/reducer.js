/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 *
 *
 */
import { fromJS } from 'immutable';

import {
  CHANGE_TITLE,
  SET_USER,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  REMOVE_LOGIN_TOKEN,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  title: 'Loading...',
  user: {},
  snackBarOpen: false,
  snackBarMessage: 'Default Message',
  snackbarProps: {},
  redirect: '',
  stats: {},
  rasa: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return state.set('title', action.title);
    case SET_USER:
      return state.set('user', action.user);
    case SHOW_SNACKBAR:
      return state
        .set('snackBarOpen', true)
        .set('snackBarMessage', action.message)
        .set('snackbarProps', action.props);
    case HIDE_SNACKBAR:
      return state.set('snackBarOpen', false);
    case REMOVE_LOGIN_TOKEN:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return state;
    default:
      return state;
  }
}

export default homeReducer;
