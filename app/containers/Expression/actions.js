/*
 *
 * Expression actions
 *
 */

import * as c from './constants';

export const setIntentName = name => ({ type: c.SET_INTENT_NAME, name });
export const updateIntentName = name => ({ type: c.UPDATE_INTENT_NAME, name });
export const saveUpdatedIntentName = agent => ({
  type: c.SAVE_UPDATED_INTENT_NAME,
  agent,
});
export const savingUpdatedIntentName = toggle => ({
  type: c.SAVING_UPDATED_INTENT_NAME,
  toggle,
});

export const getExpressions = (agent, intent) => ({
  type: c.GET_EXPRESSION,
  agent,
  intent,
});

export const gettingExpression = toggle => ({
  type: c.GETING_EXPRESSION,
  toggle,
});

export const getExpressionsSuccess = expressions => ({
  type: c.GET_EXPRESSION_SUCCESS,
  expressions,
});

export const getExpressionFailure = error => ({
  type: c.GET_EXPRESSION_FAILURE,
  error,
});

export const addExpression = (agent, intent, expressions, resolve, reject) => ({
  type: c.ADD_EXPRESSION,
  expressions,
  agent,
  intent,
  resolve,
  reject,
});

export const addingExpression = toggle => ({
  type: c.ADDING_EXPRESSION,
  toggle,
});

export const addExpressionSuccess = expressions => ({
  type: c.ADD_EXPRESSION_SUCCESS,
  expressions,
});

export const addExpressionFailure = error => ({
  type: c.ADD_EXPRESSION_FAILURE,
  error,
});

export const removeExpression = (agent, intent, expressions) => ({
  type: c.REMOVE_EXPRESSION,
  agent,
  intent,
  expressions,
});

export const removingExpression = toggle => ({
  type: c.REMOVING_EXPRESSION,
  toggle,
});

export const removeExpressionSuccess = expressions => ({
  type: c.REMOVE_EXPRESSION_SUCCESS,
  expressions,
});

export const removeExpressionFailure = error => ({
  type: c.REMOVE_EXPRESSION_FAILURE,
  error,
});

export const addParameter = (agent, intent, entity) => ({
  type: c.ADD_PARAMETER,
  agent,
  intent,
  entity,
});

export const addingParameter = toggle => ({
  type: c.ADDING_PARAMETER,
  toggle,
});

export const addParameterSuccess = entity => ({
  type: c.ADD_PARAMETER_SUCCESS,
  entity,
});

export const addParameterFailure = error => ({
  type: c.ADD_PARAMETER_FAILURE,
  error,
});

export const removeParameter = entity => ({
  type: c.REMOVE_PARAMETER,
  entity,
});

export const removingParameter = toggle => ({
  type: c.REMOVING_PARAMETER,
  toggle,
});

export const removeParameterSuccess = entity => ({
  type: c.REMOVE_PARAMETER_SUCCESS,
  entity,
});

export const removeParameterFailure = error => ({
  type: c.REMOVE_PARAMETER_FAILURE,
  error,
});

export const getEntities = () => ({
  type: c.GET_ENTITIES,
});

export const getingEntities = toggle => ({
  type: c.GETTING_ENTITIES,
  toggle,
});

export const getEntitiesSuccess = entities => ({
  type: c.GET_ENTITIES_SUCCESS,
  entities,
});

export const getEntitiesFailure = error => ({
  type: c.GET_EXPRESSION_FAILURE,
  error,
});
