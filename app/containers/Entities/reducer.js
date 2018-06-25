/*
 *
 * Entities reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  entities: [],
  addingEntity: false,
  entityError: '',
  loading: false,
});

function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    case c.ADDING_ENTITY:
      return state.set('addingEntity', action.toggle);
    case c.ADD_ENTITY_FAILURE:
      return state.set('entityError', action.error);
    case c.ADD_ENTITY_SUCCESS:
      return state
        .update('entities', entities =>
          [{ name: action.entity }].concat(entities),
        )
        .set('entityError', '');
    case c.GETING_ENTITIES:
      return state.set('loading', action.toggle);
    case c.GET_ENTITIES_SUCCESS:
      return state.set('entities', action.entities.reverse());
    case c.GET_ENTITIES_FAILURE:
      return state.set('entityError', action.error);
    case c.REMOVE_ENTITIES_SUCCESS:
      return state.update('entities', entities =>
        entities.filter(entity => !action.entities.includes(entity.name)),
      );
    default:
      return state;
  }
}

export default entitiesReducer;
