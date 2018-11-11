/*
 *
 * Agents reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  agents: [],
  loading: true,
  saving: false,
  saveError: '',
  loadingError: '',
  edit: false,
  oldNode: '',
  updating: false,
});

function agentsReducer(state = initialState, action) {
  switch (action.type) {
    case c.UPDATING_AGENT:
      return state.set('updating', action.toggle);
    case c.TOGGLE_DIALOG:
      return state
        .set('edit', action.edit)
        .set('oldNode', action.oldNode)
        .set('saveError', '');
    case c.GETTING_AGENTS_SUCCESS:
      return state.set('agents', action.agents);
    case c.GETTING_AGENTS:
      return state.set('loading', action.loading);
    case c.GETTING_AGENTS_FAILURE:
      return state.set('loadingError', action.error);
    case c.SAVING_AGENT:
      return state.set('saving', action.saving);
    case c.SAVING_AGENT_FAILURE:
      return state.set('saveError', action.error);
    case c.SAVING_AGENT_SUCCESS: {
      const temp = state.toJS();
      temp.agents.push(action.agent);
      temp.open = false;
      temp.saveError = '';
      return fromJS(temp);
    }
    default:
      return state;
  }
}

export default agentsReducer;
