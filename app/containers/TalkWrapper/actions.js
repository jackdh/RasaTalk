/*
 *
 * TalkWrapper actions
 *
 */

import * as c from './constants';

export const addTalkWrappers = (TalkWrapper, reset) => ({
  type: c.ADD_TALK_WRAPPERS,
  TalkWrapper,
  reset,
});
export const addingTalkWrappers = toggle => ({
  type: c.ADDING_TALK_WRAPPERS,
  toggle,
});
export const addTalkWrappersSuccess = () => ({
  type: c.ADD_TALK_WRAPPERS_SUCCESS,
});
export const addTalkWrappersFailure = () => ({
  type: c.ADD_TALK_WRAPPERS_FAILURE,
});

export const updateTalkWrappers = (TalkWrapper, close) => ({
  type: c.UPDATE_TALK_WRAPPERS,
  TalkWrapper,
  close,
});
export const updatingTalkWrappers = toggle => ({
  type: c.UPDATING_TALK_WRAPPERS,
  toggle,
});
export const updateTalkWrappersSuccess = () => ({
  type: c.UPDATE_TALK_WRAPPERS_SUCCESS,
});
export const updateTalkWrappersFailure = () => ({
  type: c.UPDATE_TALK_WRAPPERS_FAILURE,
});

export const deleteTalkWrappers = _id => ({
  type: c.DELETE_TALK_WRAPPERS,
  _id,
});
export const deletingTalkWrappers = toggle => ({
  type: c.DELETING_TALK_WRAPPERS,
  toggle,
});
export const deleteTalkWrappersSuccess = () => ({
  type: c.DELETE_TALK_WRAPPERS_SUCCESS,
});
export const deleteTalkWrappersFailure = () => ({
  type: c.DELETE_TALK_WRAPPERS_FAILURE,
});
