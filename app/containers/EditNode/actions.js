/*
 *
 * EditNode actions
 *
 */

import * as c from './constants';

export const loadNode = () => ({ type: c.LOAD_NODE });
export const loadingNodeInfo = loading => ({
  type: c.LOADING_NODE_INFO,
  loading,
});
export const loadNodeInfoSuccess = info => ({
  type: c.LOAD_NODE_INFO_SUCCESS,
  info,
});
export const loadNodeInfoFailure = error => ({
  type: c.LOAD_NODE_INFO_FAILURE,
  error,
});

export const saveNode = () => ({ type: c.SAVE_NODE });
export const savingNodeInfo = loading => ({
  type: c.SAVING_NODE_INFO,
  loading,
});
export const saveNodeInfoSuccess = info => ({
  type: c.SAVE_NODE_INFO_SUCCESS,
  info,
});
export const saveNodeInfoFailure = error => ({
  type: c.SAVE_NODE_INFO_FAILURE,
  error,
});
