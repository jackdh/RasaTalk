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

export const getTalkWrappers = () => ({ type: c.GET_TALK_WRAPPERS });
export const gettingTalkWrappers = toggle => ({
  type: c.GETTING_TALK_WRAPPERS,
  toggle,
});
export const getTalkWrappersSuccess = groups => ({
  type: c.GET_TALK_WRAPPERS_SUCCESS,
  groups,
});
export const getTalkWrappersFailure = () => ({
  type: c.GET_TALK_WRAPPERS_FAILURE,
});
