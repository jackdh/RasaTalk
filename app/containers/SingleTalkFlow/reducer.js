/*
 *
 * SingleTalkFlow reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';
export const initialState = fromJS({
  node: '',
  editNode: '',

  name: '',
  uid: '',
  children: [],
  enabled: false,

  details: {
    responses: 0,
    slots: 0,
  },
  error: '',
  loading: true,
  selectedNode: '',
});

function talkFlowReducer(state = initialState, action) {
  switch (action.type) {
    case c.SET_NODE_UID:
      return state.set('uid', action.uid);
    case c.SET_EDIT_UID:
      return state.set('editNode', action.uid);

    case c.REQUESTING_NODE_FAMILY:
      return state.set('loading', action.loading);
    case c.LOAD_NODE_FAMILY_SUCCESS:
      return state
        .set('name', action.nodes.name)
        .set('uid', action.nodes.uid)
        .set('children', action.nodes.children)
        .set('enabled', action.nodes.enabled);
    case c.LOAD_NODE_FAMILY_FAILURE:
      return state.set('error', action.error);

    case c.ADDING_NODE:
      return state.set('addingNode', action.loading);
    case c.ADD_NODE_SUCCESS:
      return state
        .set('name', action.nodes.name)
        .set('uid', action.nodes.uid)
        .set('children', action.nodes.children)
        .set('enabled', action.nodes.enabled); // TODO update to just add the new node. Not the whole thing.
    case c.ADD_NODE_FAILURE:
      return state.set('error', action.error);

    case c.REMOVING_NODE:
      return state.set('removingNode', action.loading);
    case c.REMOVE_NODE_SUCCESS:
      return state
        .set('name', action.nodes.name)
        .set('uid', action.nodes.uid)
        .set('children', action.nodes.children)
        .set('enabled', action.nodes.enabled); // TODO update to just add the new node. Not the whole thing.
    case c.REMOVE_NODE_FAILURE:
      return state.set('error', action.error);

    case c.MOVING_NODE:
      return state.set('movingNode', action.loading);
    case c.MOVE_NODE_SUCCESS:
      return state
        .set('name', action.nodes.name)
        .set('uid', action.nodes.uid)
        .set('children', action.nodes.children)
        .set('enabled', action.nodes.enabled); // TODO update to just add the new node. Not the whole thing.
    case c.MOVE_NODE_FAILURE:
      return state.set('error', action.error);

    default:
      return state;
  }
}

export default talkFlowReducer;
