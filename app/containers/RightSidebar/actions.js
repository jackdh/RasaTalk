/*
 *
 * RightSidebar actions
 *
 */

import * as c from './constants';

export const updateAgent = project => ({ type: c.UPDATE_AGENT, project });
export const removeAgent = () => ({ type: c.REMOVE_AGENT });
export const updateModel = model => ({ type: c.UPDATE_MODEL, model });
export const updateExpression = expression => ({
  type: c.UPDATE_EXPRESSION,
  expression,
});

export const getStatus = () => ({ type: c.GET_STATUS });
export const gettingStatus = toggle => ({ type: c.GETTING_STATUS, toggle });
export const getStatusSuccess = data => ({ type: c.GET_STATUS_SUCCESS, data });
export const getStatusFailure = error => ({
  type: c.GET_STATUS_FAILURE,
  error,
});

export const sendQuery = () => ({ type: c.SEND_QUERY });
export const sendingQuery = toggle => ({ type: c.SENDING_QUERY, toggle });
export const sendQuerySuccess = data => ({ type: c.SEND_QUERY_SUCCESS, data });
export const sendQueryFailure = error => ({
  type: c.SEND_QUERY_FAILURE,
  error,
});

export const sendChat = () => ({ type: c.SEND_CHAT });
export const sendingChat = toggle => ({ type: c.SENDING_CHAT, toggle });
export const sendChatSuccess = data => ({ type: c.SEND_CHAT_SUCCESS, data });
export const sendChatFailure = error => ({ type: c.SEND_CHAT_FAILURE, error });
