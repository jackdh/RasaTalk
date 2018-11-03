/*
 *
 * NodeWrapper actions
 *
 */

import * as c from './constants';

export const addNodeWrappers = (nodeWrapper, reset) => ({
  type: c.ADD_NODE_WRAPPERS,
  nodeWrapper,
  reset,
});
export const addingNodeWrappers = toggle => ({
  type: c.ADDING_NODE_WRAPPERS,
  toggle,
});
export const addNodeWrappersSuccess = () => ({
  type: c.ADD_NODE_WRAPPERS_SUCCESS,
});
export const addNodeWrappersFailure = () => ({
  type: c.ADD_NODE_WRAPPERS_FAILURE,
});

export const getNodeWrappers = () => ({ type: c.GET_NODE_WRAPPERS });
export const gettingNodeWrappers = toggle => ({
  type: c.GETTING_NODE_WRAPPERS,
  toggle,
});
export const getNodeWrappersSuccess = groups => ({
  type: c.GET_NODE_WRAPPERS_SUCCESS,
  groups,
});
export const getNodeWrappersFailure = () => ({
  type: c.GET_NODE_WRAPPERS_FAILURE,
});
