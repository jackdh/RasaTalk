import axios from 'axios';
import _debug from 'debug';
import { push } from 'react-router-redux';
import { put, takeLatest } from 'redux-saga/effects';

import { ADD_NODE, MOVE_NODE, REMOVE_NODE, SET_NODE_UID } from './constants';
import {
  requestingNodeFamily,
  nodeFamilyLoaded,
  nodeFamilyLoadedError,
  addingNode,
  addNodeSuccess,
  addNodeFailure,
  removingNode,
  removeNodeSuccess,
  removeNodeFailure,
  moveNodeSuccess,
  moveNodeFailure,
  movingNode,
} from './actions';

const debug = _debug('SingleTalkFlow\\saga.js');

export function* getNodeFamily({ uid }) {
  debug('Getting Node Family for %s', uid);
  yield put(requestingNodeFamily(true));

  try {
    const { data } = yield axios.get(`/api/node-family/${uid}`);
    yield put(nodeFamilyLoaded(data));
  } catch (error) {
    debug('Failed getting node family %O', error);
    yield put(nodeFamilyLoadedError(error));
  } finally {
    yield put(requestingNodeFamily(false));
  }
}

export function* addNode({ uid }) {
  debug(`Adding new node for uuid: ${uid}`);
  yield put(addingNode(true));

  try {
    const { data } = yield axios.post(`/api/node-add/${uid}`);
    yield put(addNodeSuccess(data));
  } catch (error) {
    debug('Failed adding new node for uuid %s error: %O', uid, error);
    yield put(addNodeFailure(error.message));
  } finally {
    yield put(addingNode(false));
  }
}

export function* removeNode({ uid }) {
  debug(`Adding new node for uuid: ${uid}`);
  yield put(removingNode(true));
  try {
    const { data } = yield axios.delete(`/api/node-remove/${uid}`);
    if (data) {
      yield put(removeNodeSuccess(data));
    } else {
      yield put(push('/talk'));
    }
  } catch (error) {
    debug('Failed removing new node for uuid %s error: %O', uid, error);
    yield put(removeNodeFailure(error.message));
  } finally {
    yield put(removingNode(false));
  }
}

export function* moveNode({ uid, direction }) {
  debug(`Adding new node for uuid: ${uid}`);
  yield put(movingNode(true));
  try {
    const { data } = yield axios.post(`/api/node-move/${uid}/${direction}`);
    yield put(moveNodeSuccess(data));
  } catch (error) {
    debug('Failed moving new node for uuid %s error: %O', uid, error);
    yield put(moveNodeFailure(error.message));
  } finally {
    yield put(movingNode(false));
  }
}

export default function* SingleTalkFlowSaga() {
  yield [
    takeLatest(SET_NODE_UID, getNodeFamily),
    takeLatest(ADD_NODE, addNode),
    takeLatest(REMOVE_NODE, removeNode),
    takeLatest(MOVE_NODE, moveNode),
  ];
}
