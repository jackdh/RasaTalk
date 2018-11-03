/*
 *
 * NodeWrapper reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  adding: false,
  groups: [],
});

function nodeWrapperReducer(state = initialState, action) {
  switch (action.type) {
    case c.ADDING_NODE_WRAPPERS:
      return state.set('adding', action.toggle);
    case c.GET_NODE_WRAPPERS_SUCCESS:
      return state.set('groups', action.groups);
    default:
      return state;
  }
}

export default nodeWrapperReducer;
