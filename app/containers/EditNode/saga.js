import { takeLatest, put, select } from 'redux-saga/effects';
import { initialize, getFormValues, isInvalid } from 'redux-form/immutable';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import { selectEditNode, selectHead } from '../SingleTalkFlow/selectors';
import { nodeFamilyLoaded } from '../SingleTalkFlow/actions';
import { LOAD_NODE, SAVE_NODE } from './constants';
import * as a from './actions';

function* loadNode() {
  yield put(a.loadingNodeInfo(true));
  try {
    const uid = yield select(selectEditNode());

    if (isEmpty(uid)) return;
    const { data } = yield axios.get(`/api/node-single/${uid}`);
    yield put(initialize('EditNode', data));
  } catch (e) {
    yield put(a.loadNodeInfoFailure(e.message));
  } finally {
    yield put(a.loadingNodeInfo(false));
  }
}

function* saveNode() {
  // const fuck = yield select(hasError());
  const notValid = yield select(isInvalid('EditNode'));
  if (notValid) return;

  yield put(a.savingNodeInfo(true));
  try {
    const uid = yield select(selectEditNode());
    const head = yield select(selectHead());
    let node = yield select(getFormValues('EditNode'));
    node = node.toJS();
    node.head = head;
    const { data } = yield axios.post(`/api/node-single/${uid}`, node);
    yield put(initialize('EditNode', node));
    yield put(nodeFamilyLoaded(data));
  } catch (e) {
    yield put(a.saveNodeInfoFailure(e.message));
  } finally {
    yield put(a.savingNodeInfo(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOAD_NODE, loadNode);
  yield takeLatest(SAVE_NODE, saveNode);
}
