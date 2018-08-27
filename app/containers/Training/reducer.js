/* eslint-disable no-underscore-dangle,no-param-reassign */
/*
 *
 * Training reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  loading: true,
  loadingError: '',
  getting: false,
  json: {},
  training: [],
  inTraining: false,
});

function trainingReducer(state = initialState, action) {
  switch (action.type) {
    case c.GETTING_JSON_SUCCESS:
      return state.set('json', action.json).update('training', training => {
        const contains = !!training.find(o => o._id === action.json._id);
        if (!contains) training.unshift(action.json);
        return training;
      });
    case c.GETTING_JSON:
      return state.set('getting', action.getting);
    case c.GETTING_JSON_FAILURE:
      return state.set('loadingError', action.loadingError);

    case c.GET_ALL:
      return state.set('loading', action.loading);
    case c.GET_ALL_SUCCESS:
      return state.set('training', action.training.reverse());
    case c.GET_ALL_FAILURE:
      return state.set('error', action.error);

    case c.GENERATING_JSON:
      return state
        .set('loading', action.loading)
        .set('json', action.loading ? {} : state.get('json'));
    case c.VIEW_JSON_SUCCESS:
      return state.set('json', action.json);
    case c.VIEW_JSON_FAILURE:
      return state.set('error', action.error);

    case c.TRAINING_JSON:
      return state.set('inTraining', action.loading);
    case c.TRAIN_JSON_SUCCESS:
      return state.update('training', training => {
        training[training.findIndex(t => t._id === action.json._id)] =
          action.json;
        return training;
      });
    case c.TRAIN_JSON_FAILURE:
      return state.set('error', action.error);

    case c.GETTING_STATUS:
      return state.set('loading', action.loading);
    case c.GET_STATUS_FAILURE:
      return state.set('error', action.error);

    default:
      return state;
  }
}

export default trainingReducer;
