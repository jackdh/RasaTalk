/*
 *
 * SingleTalkFlow actions
 *
 */

/*
 *
 * Talk actions
 *
 */

import * as c from './constants';

export const setCurrentNode = uid => ({ type: c.SET_NODE_UID, uid });
export const setEditNode = uid => ({ type: c.SET_EDIT_UID, uid });

export const loadNodeFamily = () => ({ type: c.LOAD_NODE_FAMILY });

/**
 * Load the the node family. These are the lines of nodes which you first see when loading the page.
 *
 * @returns {object} An action object with a type of REQUESTING_NODE_FAMILY
 */
export const requestingNodeFamily = loading => ({
  type: c.REQUESTING_NODE_FAMILY,
  loading,
});

/**
 * Dispatch when the node family is loaded
 * @param nodes
 * @returns {{type: string, parents: *}} Type of LOAD_NODE_FAMILY_SUCCESS passing the nodes
 */
export const nodeFamilyLoaded = nodes => ({
  type: c.LOAD_NODE_FAMILY_SUCCESS,
  nodes,
});

/**
 * Dispatch when loading the node family fails
 * @param error
 * @returns {{type: string, error: *}}
 */
export const nodeFamilyLoadedError = error => ({
  type: c.LOAD_NODE_FAMILY_FAILURE,
  error,
});

/**
 * Called when they want to add a new node
 * @param uid
 * @returns {{type: string, uid: *}}
 */
export const addNode = uid => ({ type: c.ADD_NODE, uid });

/**
 * Called when first adding a new node, and then again once it has been either successfully or unsuccessfully added.
 * @param loading
 * @returns {{type: string, loading: boolean}}
 */
export const addingNode = loading => ({ type: c.ADDING_NODE, loading });

/**
 * Successfully added a new node
 * @param uid
 * @returns {{type: string, nodes: the family}}
 */
export const addNodeSuccess = nodes => ({ type: c.ADD_NODE_SUCCESS, nodes });

/**
 * Called if we fail adding a node
 * @param error
 * @returns {{type: string, error: string }}
 */
export const addNodeFailure = error => ({ type: c.ADD_NODE_FAILURE, error });

/**
 * Called when they want to remove a new node
 * @param uid
 * @returns {{type: string, uid: *}}
 */
export const removeNode = uid => ({ type: c.REMOVE_NODE, uid });

/**
 * Called when first removing a new node, and then again once it has been either successfully or unsuccessfully removeed.
 * @param loading
 * @returns {{type: string, loading: boolean}}
 */
export const removingNode = loading => ({ type: c.REMOVING_NODE, loading });

/**
 * Successfully removeed a new node
 * @param uid
 * @returns {{type: string, nodes: the family}}
 */
export const removeNodeSuccess = nodes => ({
  type: c.REMOVE_NODE_SUCCESS,
  nodes,
});

/**
 * Called if we fail removing a node
 * @param error
 * @returns {{type: string, error: string }}
 */
export const removeNodeFailure = error => ({
  type: c.REMOVE_NODE_FAILURE,
  error,
});

/**
 * Called when they want to move a new node
 * @param uid
 * @returns {{type: string, uid: *}}
 */
export const moveNode = (uid, direction) => ({
  type: c.MOVE_NODE,
  uid,
  direction,
});

/**
 * Called when first moving a new node, and then again once it has been either successfully or unsuccessfully move'd.
 * @param loading
 * @returns {{type: string, loading: boolean}}
 */
export const movingNode = loading => ({ type: c.MOVING_NODE, loading });

/**
 * Successfully move'd a new node
 * @param uid
 * @returns {{type: string, nodes: the family}}
 */
export const moveNodeSuccess = nodes => ({ type: c.MOVE_NODE_SUCCESS, nodes });

/**
 * Called if we fail moving a node
 * @param error
 * @returns {{type: string, error: string }}
 */
export const moveNodeFailure = error => ({ type: c.MOVE_NODE_FAILURE, error });
