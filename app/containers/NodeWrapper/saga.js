import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_NODE_WRAPPERS, ADD_NODE_WRAPPERS } from './constants';
import * as a from './actions';
const debug = require('debug')('Node Wrapper');

function* addNodeWrapper({ nodeWrapper, reset }) {
  yield put(a.addingNodeWrappers(true));
  try {
    yield call(axios.post, '/api/node-wrapper', nodeWrapper);
    yield getNodeWrappers();
    reset();
  } catch (e) {
    debug(e);
    yield put(a.addNodeWrappersFailure());
  } finally {
    yield put(a.addingNodeWrappers(false));
  }
}

function* getNodeWrappers() {
  yield put(a.gettingNodeWrappers(true));
  try {
    const { data } = yield call(axios.get, '/api/node-wrapper');
    yield put(a.getNodeWrappersSuccess(data));
  } catch (e) {
    debug(e);
    yield put(a.getNodeWrappersFailure());
  } finally {
    yield put(a.gettingNodeWrappers(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [takeLatest(GET_NODE_WRAPPERS, getNodeWrappers)];
  yield [takeLatest(ADD_NODE_WRAPPERS, addNodeWrapper)];
}
