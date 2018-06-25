/*
 *
 * RightSidebar reducer
 *
 */

import { fromJS } from 'immutable';

import * as c from './constants';

export const initialState = fromJS({
  status: {
    available_projects: {},
  },

  project: localStorage.getItem('RightSidebar-agent')
    ? localStorage.getItem('RightSidebar-agent')
    : '',
  model: '',
  q: '',
  response: false, // {}
  sending: false,
  messages: [], // []
  typing: false,
});

function rightSidebarReducer(state = initialState, action) {
  switch (action.type) {
    case c.UPDATE_AGENT:
      localStorage.setItem('RightSidebar-agent', action.project);
      return state.set('project', action.project);
    case c.REMOVE_AGENT:
      localStorage.removeItem('RightSidebar-agent');
      return state.set('project', '');
    case c.UPDATE_MODEL:
      return state.set('model', action.model);
    case c.UPDATE_EXPRESSION:
      return state.set('q', action.expression);

    case c.GETTING_STATUS:
      return state.set('loading', action.loading);
    case c.GET_STATUS_SUCCESS:
      return state.set('status', action.data);
    case c.GET_STATUS_FAILURE:
      return state.set('error', action.error);

    case c.SENDING_QUERY:
      return state.set('sending', action.toggle);
    case c.SEND_QUERY_SUCCESS:
      return state.set('response', action.data);

    case c.SENDING_CHAT:
      return state.set('typing', action.toggle);
    case c.SEND_CHAT_SUCCESS:
      return state.update('messages', messages =>
        [action.data].concat(messages),
      );
    default:
      return state;
  }
}

export default rightSidebarReducer;
