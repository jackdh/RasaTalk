/*
 *
 * Talk reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUESTING_PARENTS,
  REQUESTING_PARENTS_SUCCESS,
  REQUESTING_PARENTS_FAILURE,
  ADDING_NODE,
  ADD_NODE_SUCCESS,
  ADD_NODE_FAILURE,
} from './constants';

export const initialState = fromJS({
  parentsLoaded: false,
  errorMessage: '',
  parents: [],
  loading: true,
  goTo: '',
});

function talkReducer(state = initialState, action) {
  switch (action.type) {
    case REQUESTING_PARENTS:
      return state.set('loading', action.loading);
    case REQUESTING_PARENTS_SUCCESS:
      return state.set('parents', action.parents).set('parentsLoaded', true);
    // return state.set('parentsLoaded', true);
    case REQUESTING_PARENTS_FAILURE:
      return state.set('errorMessage', action.err);
    case ADDING_NODE:
      return state.set('loading', action.adding);
    case ADD_NODE_SUCCESS:
      return state.set('goTo', action.uid);
    case ADD_NODE_FAILURE:
      return state.set('errorMessage', action.error);
    default:
      return state;
  }
}

export default talkReducer;
