import { fromJS } from 'immutable';

import * as c from './constants';

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
  talkWrappers: [],
  addingTalkWrappers: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case c.GETTING_TALK_WRAPPERS:
      return state.set('addingTalkWrappers', action.toggle);
    case c.GET_TALK_WRAPPERS_SUCCESS:
      return state.set('talkWrappers', action.groups);
    case c.GETTING_AGENTS_SUCCESS:
      return state.set('agents', action.agents);
    case c.GETTING_AGENTS:
      return state.set('gettingAgents', action.loading);
    case c.GETTING_AGENTS_FAILURE:
      return state.set('loadingError', action.error);
    case c.CHANGE_TITLE:
      return state.set('title', action.title);
    case c.SET_USER:
      return state.set('user', action.user);
    case c.SHOW_SNACKBAR:
      return state
        .set('snackBarOpen', true)
        .set('snackBarMessage', action.message)
        .set('snackbarProps', action.props);
    case c.HIDE_SNACKBAR:
      return state.set('snackBarOpen', false);
    case c.REMOVE_LOGIN_TOKEN:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return state;
    default:
      return state;
  }
}

export default homeReducer;
