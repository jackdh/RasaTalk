/*
 *
 * Talk actions
 *
 */

import {
  LOAD_PARENTS,
  REQUESTING_PARENTS,
  REQUESTING_PARENTS_SUCCESS,
  REQUESTING_PARENTS_FAILURE,
  ADD_NODE,
  ADDING_NODE,
  ADD_NODE_SUCCESS,
  ADD_NODE_FAILURE,
} from './constants';

export const loadParents = talkWrapper => ({ type: LOAD_PARENTS, talkWrapper });

/**
 * Load the all the parent nodes
 * @returns {object} An action object with a type of REQUESTING_PARENTS
 */
export const requestingParents = loading => ({
  type: REQUESTING_PARENTS,
  loading,
});

/**
 * Dispatch when the parents are loaded by the request saga
 * @param parents
 * @returns {{type: string, parents: *}} Type of REQUESTING_PARENTS_SUCCESS passing the parents
 */
export const parentsLoaded = parents => ({
  type: REQUESTING_PARENTS_SUCCESS,
  parents,
});

/**
 * Dispatch when loading the parent nodes fails
 * @param error
 * @returns {{type: string, error: *}}
 */
export const parentsLoadedError = error => ({
  type: REQUESTING_PARENTS_FAILURE,
  error,
});

export const addNode = (talkWrapper, name) => ({
  type: ADD_NODE,
  talkWrapper,
  name,
});

export const addingNode = adding => ({ type: ADDING_NODE, adding });

export const addNodeSuccess = uid => ({ type: ADD_NODE_SUCCESS, uid });

export const addNodeFailure = error => ({ type: ADD_NODE_FAILURE, error });
