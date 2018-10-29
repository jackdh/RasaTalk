/*
 *
 * NodePage actions
 *
 */

import * as c from './constants';

export const getAgent = agent => ({
  type: c.GET_AGENT,
  agent,
});

export const gettingAgent = toggle => ({
  type: c.GETTING_AGENT,
  toggle,
});

export const getAgentSuccess = agent => ({
  type: c.GET_AGENT_SUCCESS,
  agent,
});

export const getAgentFailure = error => ({
  type: c.GET_AGENT_FAILURE,
  error,
});

export const addIntent = (agent, intent, stay, resolve, reject) => ({
  type: c.ADD_INTENT,
  agent,
  intent,
  stay,
  resolve,
  reject,
});

export const addingIntent = toggle => ({
  type: c.ADDING_INTENT,
  toggle,
});

export const addIntentSuccess = intent => ({
  type: c.ADD_INTENT_SUCCESS,
  intent,
});

export const addIntentFailure = error => ({
  type: c.ADD_INTENT_FAILURE,
  error,
});

export const removeIntents = (agent, intents) => ({
  type: c.REMOVE_INTENTS,
  agent,
  intents,
});

export const removingIntents = toggle => ({
  type: c.REMOVING_INTENTS,
  toggle,
});

export const removeIntentsSuccess = intent => ({
  type: c.REMOVE_INTENTS_SUCCESS,
  intent,
});

export const removeIntentsFailure = error => ({
  type: c.REMOVE_INTENTS_FAILURE,
  error,
});
