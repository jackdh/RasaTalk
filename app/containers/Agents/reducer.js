/*
 *
 * Agents reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOGGLE_DIALOG,
  GETTING_AGENTS_SUCCESS,
  SAVING_AGENT,
  GETTING_AGENTS,
  GETTING_AGENTS_FAILURE,
  SAVING_AGENT_FAILURE,
  SAVING_AGENT_SUCCESS,
  UPDATE_AGENT_SUCCESS,
  DELETING_AGENT_SUCCESS,
} from './constants';

export const initialState = fromJS({
  agents: [],
  loading: true,
  saving: false,
  saveError: '',
  loadingError: '',
  edit: false,
  oldNode: '',
});

function agentsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return state
        .set('edit', action.edit)
        .set('oldNode', action.oldNode)
        .set('saveError', '');
    case GETTING_AGENTS_SUCCESS:
      return state.set('agents', action.agents);
    case GETTING_AGENTS:
      return state.set('loading', action.loading);
    case GETTING_AGENTS_FAILURE:
      return state.set('loadingError', action.error);
    case SAVING_AGENT:
      return state.set('saving', action.saving);
    case SAVING_AGENT_FAILURE:
      return state.set('saveError', action.error);
    case SAVING_AGENT_SUCCESS: {
      const temp = state.toJS();
      temp.agents.push(action.agent);
      temp.open = false;
      temp.saveError = '';
      return fromJS(temp);
    }
    case UPDATE_AGENT_SUCCESS: {
      // TODO update to use immutable
      const temp = state.toJS();
      for (let i = 0; i < temp.agents.length; i += 1) {
        if (temp.agents[i].agent === temp.oldNode) {
          temp.agents[i] = action.agent;
        }
      }
      return fromJS(temp)
        .set('open', false)
        .set('saveError', '');
    }
    case DELETING_AGENT_SUCCESS: {
      // TODO update to use immutable
      const temp = state.toJS();
      for (let i = 0; i < temp.agents.length; i += 1) {
        if (temp.agents[i].agent === temp.oldNode) {
          temp.agents.splice(i, 1);
        }
      }
      return fromJS(temp)
        .set('open', false)
        .set('saveError', '');
    }
    default:
      return state;
  }
}

export default agentsReducer;
