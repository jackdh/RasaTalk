import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getTalkWrappers } from 'containers/HomePage/saga';

import { ADD_TALK_WRAPPERS } from './constants';
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

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [takeLatest(ADD_TALK_WRAPPERS, addTalkWrapper)];
}
