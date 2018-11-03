import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_TALK_WRAPPERS, ADD_TALK_WRAPPERS } from './constants';
import * as a from './actions';
const debug = require('debug')('Node Wrapper');

function* addTalkWrapper({ TalkWrapper, reset }) {
  yield put(a.addingTalkWrappers(true));
  try {
    yield call(axios.post, '/api/node-wrapper', TalkWrapper);
    yield getTalkWrappers();
    reset();
  } catch (e) {
    debug(e);
    yield put(a.addTalkWrappersFailure());
  } finally {
    yield put(a.addingTalkWrappers(false));
  }
}

function* getTalkWrappers() {
  yield put(a.gettingTalkWrappers(true));
  try {
    const { data } = yield call(axios.get, '/api/node-wrapper');
    yield put(a.getTalkWrappersSuccess(data));
  } catch (e) {
    debug(e);
    yield put(a.getTalkWrappersFailure());
  } finally {
    yield put(a.gettingTalkWrappers(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [takeLatest(GET_TALK_WRAPPERS, getTalkWrappers)];
  yield [takeLatest(ADD_TALK_WRAPPERS, addTalkWrapper)];
}
