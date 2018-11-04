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
