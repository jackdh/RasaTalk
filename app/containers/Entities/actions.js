/*
 *
 * Entities actions
 *
 */

import * as c from './constants';

export const addEntity = (entity, resolve) => ({
  type: c.ADD_ENTITY,
  entity,
  resolve,
});
export const addingEntity = toggle => ({ type: c.ADDING_ENTITY, toggle });
export const addEntityFailure = error => ({
  type: c.ADD_ENTITY_FAILURE,
  error,
});
export const addEntitySuccess = entity => ({
  type: c.ADD_ENTITY_SUCCESS,
  entity,
});

export const getEntities = () => ({ type: c.GET_ENTITIES });
export const gettingEntities = toggle => ({ type: c.GETING_ENTITIES, toggle });
export const getEntitiesFailure = error => ({
  type: c.GET_ENTITIES_FAILURE,
  error,
});
export const getEntitiesSuccess = entities => ({
  type: c.GET_ENTITIES_SUCCESS,
  entities,
});

export const removeEntities = entities => ({
  type: c.REMOVE_ENTITIES,
  entities,
});
export const removingEntities = toggle => ({
  type: c.REMOVING_ENTITIES,
  toggle,
});
export const removeEntitiesFailure = error => ({
  type: c.REMOVE_ENTITIES_FAILURE,
  error,
});
export const removeEntitiesSuccess = entities => ({
  type: c.REMOVE_ENTITIES_SUCCESS,
  entities,
});
