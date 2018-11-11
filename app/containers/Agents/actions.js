/*
 *
 * Agents actions
 *
 */

import * as c from './constants';

export const toggleDialog = (toggle = false, edit = false, oldNode = '') => ({
  type: c.TOGGLE_DIALOG,
  toggle,
  edit,
  oldNode,
});

export const saveAgent = (agent, reset) => ({
  type: c.SAVE_AGENT,
  agent,
  reset,
});

export const updateAgent = (agent, close) => ({
  type: c.UPDATE_AGENT,
  agent,
  close,
});

export const updatingAgent = toggle => ({
  type: c.UPDATING_AGENT,
  toggle,
});

export const savingAgent = saving => ({
  type: c.SAVING_AGENT,
  saving,
});

export const saveAgentFailure = error => ({
  type: c.SAVING_AGENT_FAILURE,
  error,
});

export const getAgents = () => ({
  type: c.GET_AGENTS,
});

export const gettingAgent = loading => ({
  type: c.GETTING_AGENTS,
  loading,
});

export const gettingAgentsSuccess = agents => ({
  type: c.GETTING_AGENTS_SUCCESS,
  agents,
});

export const gettingAgentsFailure = error => ({
  type: c.GETTING_AGENTS_FAILURE,
  error,
});

export const deleteAgent = agent => ({
  type: c.DELETE_AGENT,
  agent,
});

export const deletingAgent = deleting => ({
  type: c.DELETING_AGENT,
  deleting,
});

export const deleteAgentSuccess = agent => ({
  type: c.DELETING_AGENT_SUCCESS,
  agent,
});
