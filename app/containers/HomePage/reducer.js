import { fromJS } from 'immutable';

import {
  CHANGE_TITLE,
  SET_USER,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  REMOVE_LOGIN_TOKEN,
  GETTING_AGENTS_SUCCESS,
  GETTING_AGENTS_FAILURE,
  GETTING_AGENTS,
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
  agents: [],
  gettingAgents: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_AGENTS_SUCCESS:
      return state.set('agents', action.agents);
    case GETTING_AGENTS:
      return state.set('gettingAgents', action.loading);
    case GETTING_AGENTS_FAILURE:
      return state.set('loadingError', action.error);
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
