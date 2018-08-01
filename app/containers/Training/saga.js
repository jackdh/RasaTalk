/* eslint-disable redux-saga/no-yield-in-race,no-constant-condition */
import { call, put, takeLatest, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import {
  GET_JSON,
  GET_ALL,
  VIEW_JSON,
  TRAIN_JSON,
  START_WATCH,
  POLL_STOP,
} from './constants';
import * as a from './actions';

import { getStatusSuccess } from '../RightSidebar/actions';

const debug = require('debug')('Training\\saga.js');

export function* getJSON({ agent }) {
  debug(`Getting JSON for agent: ${agent}`);
  yield put(a.generatingJSON(true));
  try {
    const { data } = yield call(axios.get, `/api/training/generate/${agent}`);
    yield delay(200);
    yield put(a.gettingJSONSuccess(data));
  } catch (e) {
    yield put(a.gettingJSONFailure(e.response.data));
  } finally {
    yield put(a.generatingJSON(false));
  }
}

export function* getAll() {
  debug('Getting training data');
  yield put(a.gettingAll(true));
  try {
    const { data } = yield call(axios.get, '/api/training/');
    yield put(a.gettingAllSuccess(data));
  } catch (e) {
    yield put(a.gettingAllFailure(e.response.data));
  } finally {
    yield put(a.gettingAll(false));
  }
}

export function* viewJSON({ id }) {
  debug('Viewing JSON Data');
  yield put(a.generatingJSON(true));
  try {
    const { data } = yield call(axios.post, '/api/training/json', { _id: id });
    yield delay(200);
    yield put(a.gettingJSONSuccess(data));
  } catch (e) {
    yield put(a.viewingJSONFailure(e.response.data));
  } finally {
    yield put(a.generatingJSON(false));
  }
}

export function* trainJSON({ id }) {
  debug('Viewing JSON Data');
  yield put(a.training(true));
  try {
    const { data } = yield call(axios.post, '/api/training/', { _id: id });
    yield put(a.trainSuccess(data));
  } catch (e) {
    yield put(a.trainFailure(e.response.data));
  } finally {
    yield put(a.training(false));
  }
}

export function* pollStatus() {
  while (true) {
    yield put(a.gettingStatus(true));
    try {
      const { data } = yield call(axios.get, '/api/training/rasa');
      yield put(getStatusSuccess(data));
      yield delay(5 * 1000);
    } catch (e) {
      yield put(a.getStatusFailure(e.response.data));
      yield delay(5 * 1000);
    } finally {
      yield put(a.gettingStatus(false));
    }
  }
}

export function* watcher() {
  while (true) {
    yield take(START_WATCH);
    yield race([call(pollStatus), take(POLL_STOP)]);
  }
}

export default function* TrainingSaga() {
  yield takeLatest(GET_ALL, getAll);
  yield takeLatest(GET_JSON, getJSON);
  yield takeLatest(VIEW_JSON, viewJSON);
  yield takeLatest(TRAIN_JSON, trainJSON);
}
