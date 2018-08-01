/*
 *
 * Training actions
 *
 */

import * as c from './constants';

export const getJSON = agent => ({ type: c.GET_JSON, agent });
export const gettingJSON = getting => ({ type: c.GETTING_JSON, getting });
export const gettingJSONSuccess = json => ({
  type: c.GETTING_JSON_SUCCESS,
  json,
});
export const gettingJSONFailure = error => ({
  type: c.GETTING_JSON_FAILURE,
  error,
});

export const getAll = () => ({ type: c.GET_ALL });
export const gettingAll = loading => ({ type: c.GETTING_ALL, loading });
export const gettingAllSuccess = training => ({
  type: c.GET_ALL_SUCCESS,
  training,
});
export const gettingAllFailure = error => ({ type: c.GET_ALL_FAILURE, error });

export const viewJSON = id => ({ type: c.VIEW_JSON, id });
export const generatingJSON = loading => ({ type: c.GENERATING_JSON, loading });
export const viewingJSONSuccess = json => ({ type: c.VIEW_JSON_SUCCESS, json });
export const viewingJSONFailure = error => ({
  type: c.VIEW_JSON_FAILURE,
  error,
});

export const train = id => ({ type: c.TRAIN_JSON, id });
export const training = loading => ({ type: c.TRAINING_JSON, loading });
export const trainSuccess = json => ({ type: c.TRAIN_JSON_SUCCESS, json });
export const trainFailure = error => ({ type: c.TRAIN_JSON_FAILURE, error });

export const gettingStatus = toggle => ({ type: c.GETTING_STATUS, toggle });
export const getStatusSuccess = data => ({ type: c.GET_STATUS_SUCCESS, data });
export const getStatusFailure = error => ({
  type: c.GET_STATUS_FAILURE,
  error,
});
export const startWatch = () => ({ type: c.START_WATCH });
