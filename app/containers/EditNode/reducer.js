/*
 *
 * EditNode reducer
 *
 */

import { fromJS } from 'immutable';
import { SAVING_NODE_INFO, LOADING_NODE_INFO } from './constants';

export const initialState = fromJS({
  loading: false,
});

function editNodeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVING_NODE_INFO:
      return state.set('loading', action.loading);
    case LOADING_NODE_INFO:
      return state.set('loading', action.loading);
    default:
      return state;
  }
}

export default editNodeReducer;
