import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import axios from 'axios';
import _debug from 'debug';

import {
  requestingParents,
  parentsLoaded,
  parentsLoadedError,
  addingNode,
  addNodeFailure,
} from './actions';
import { LOAD_PARENTS, ADD_NODE } from './constants';

const debug = _debug('Talk\\Saga.js');

export function* getParents() {
  debug('Getting Parents');

  yield put(requestingParents(true));

  try {
    const { data } = yield axios.get('/api/parents');
    yield put(parentsLoaded(data));
  } catch (error) {
    debug('Failed getting parents: %o', error);
    yield put(parentsLoadedError(error.message));
  } finally {
    yield put(requestingParents(false));
  }
}

export function* addNode({ name }) {
  debug('Adding Node');
  yield put(addingNode(true));
  try {
    const { data } = yield axios.post('/api/node-add/', { name });
    yield put(push(`/talk/${data}`));
  } catch (error) {
    debug('Failed adding node: %o', error);
    yield put(addNodeFailure(error.message));
  } finally {
    yield put(addingNode(false));
  }
}

export default function* parentsData() {
  yield [takeLatest(LOAD_PARENTS, getParents), takeLatest(ADD_NODE, addNode)];
}
