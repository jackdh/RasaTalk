/*
 *
 * Chatbot actions
 *
 */

import * as c from './constants';

export const updateInput = input => ({ type: c.UPDATE_INPUT, input });
export const clearInput = () => ({ type: c.CLEAR_INPUT });

export const sendInput = () => ({ type: c.SEND_INPUT });
export const sendingInput = toggle => ({ type: c.SENDING_INPUT, toggle });
export const sendInputSuccess = data => ({ type: c.SEND_INPUT_SUCCESS, data });
export const sendInputFailure = error => ({
  type: c.SEND_INPUT_FAILURE,
  error,
});

export const addMessage = message => ({ type: c.ADD_MESSAGE, message });
export const messageSuccess = uuid => ({ type: c.MESSAGE_SUCCESS, uuid });
export const messageFailure = uuid => ({ type: c.MESSAGE_FAILURE, uuid });
