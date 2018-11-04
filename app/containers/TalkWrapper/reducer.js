/*
 *
 * TalkWrapper reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  adding: false,
  groups: [],
});

function TalkWrapperReducer(state = initialState, action) {
  switch (action.type) {
    case c.ADDING_TALK_WRAPPERS:
      return state.set('adding', action.toggle);
    default:
      return state;
  }
}

export default TalkWrapperReducer;
