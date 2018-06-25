/*
 *
 * Synonyms reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  loading: false,
  synonyms: [],
  error: '',
  addingSyn: false,
});

function synonymsReducer(state = initialState, action) {
  switch (action.type) {
    case c.GETTING_SYNONYMS:
      return state.set('loading', action.toggle);
    case c.GET_SYNONYMS_SUCCESS:
      return state.set('synonyms', action.synonyms);
    case c.GET_SYNONYMS_FAILURE:
      return state.set('error', action.error);
    case c.ADD_SYNONYMS_SUCCESS:
      return state.update('synonyms', synonyms =>
        [{ synonym_reference: action.synonym, list: [] }].concat(synonyms),
      );
    case c.ADDING_SYNONYMS:
      return state.set('addingSyn', action.toggle);
    case c.ADD_SYNONYMS_FAILURE:
      return state.set('error', action.error);
    case c.REMOVE_SYNONYMS_SUCCESS:
      return state.update('synonyms', synonyms =>
        synonyms.filter(
          synonym => !action.synonyms.includes(synonym.synonym_reference),
        ),
      );
    case c.REMOVE_SYNONYMS_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default synonymsReducer;
