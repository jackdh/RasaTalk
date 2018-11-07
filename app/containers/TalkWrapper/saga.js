import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { getTalkWrappers } from 'containers/HomePage/saga';
import { push } from 'connected-react-router/immutable';

import {
  ADD_TALK_WRAPPERS,
  UPDATE_TALK_WRAPPERS,
  DELETE_TALK_WRAPPERS,
} from './constants';
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

function* updateTalkWrapper({ TalkWrapper, close }) {
  yield put(a.updatingTalkWrappers(true));
  try {
    yield call(axios.put, `/api/node-wrapper/${TalkWrapper._id}`, TalkWrapper);
    yield getTalkWrappers();
  } catch (e) {
    debug(e);
    yield put(a.updateTalkWrappersFailure());
  } finally {
    yield put(a.updatingTalkWrappers(false));
    close();
  }
}

function* deleteTalkWrapper({ _id }) {
  yield put(a.deletingTalkWrappers(true));
  try {
    yield call(axios.delete, `/api/node-wrapper/${_id}`);
    yield getTalkWrappers();
    yield put(push('/talkGroups'));
  } catch (e) {
    debug(e);
    yield put(a.deleteTalkWrappersFailure());
  } finally {
    yield put(a.deletingTalkWrappers(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [takeLatest(ADD_TALK_WRAPPERS, addTalkWrapper)];
  yield [takeLatest(UPDATE_TALK_WRAPPERS, updateTalkWrapper)];
  yield [takeLatest(DELETE_TALK_WRAPPERS, deleteTalkWrapper)];
}
