/*
 *
 * IntentPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  GETTING_INTENTS,
  GET_INTENTS_SUCCESS,
  ADDING_INTENT,
  ADD_INTENT_SUCCESS,
  ADD_INTENT_FAILURE,
  REMOVING_INTENTS,
  REMOVE_INTENTS_SUCCESS,
  REMOVE_INTENTS_FAILURE,
} from './constants';

export const initialState = fromJS({
  gettingIntents: false,
  intents: [],
  error: '',
  loadingAgent: true,
  addingIntent: false,
  removingIntent: false,
});

function intentPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INTENTS_SUCCESS:
      return state.set('intents', action.intents);
    case GETTING_INTENTS:
      return state.set('gettingIntents', action.toggle);
    case ADDING_INTENT:
      return state.set('addingIntent', action.toggle);
    case ADD_INTENT_SUCCESS:
      return state
        .set('intents', state.get('intents').push({ name: action.intent }))
        .set('error', '');
    case ADD_INTENT_FAILURE:
      return state.set('error', action.error);

    case REMOVING_INTENTS:
      return state.set('removingIntents', action.toggle);
    case REMOVE_INTENTS_SUCCESS: {
      const intents = state.get('intents');
      return state.set(
        'intents',
        intents.filter(o => !action.intent.includes(o.get('name'))),
      );
    }
    case REMOVE_INTENTS_FAILURE:
      return state.set('error', action.error);

    default:
      return state;
  }
}

export default intentPageReducer;
