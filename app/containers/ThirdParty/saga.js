import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { SAVE_FACEBOOK, GET_ALL } from './constants';
import * as a from './actions';
import { selectFacebook } from './selectors';

export function* getAll() {
  yield put(a.gettingAll(true));
  try {
    const { data } = yield call(axios.get, '/api/thirdParty');
    yield put(a.getAllSuccess(data));
  } catch (error) {
    yield put(a.getAllFailure(error));
  } finally {
    yield put(a.gettingAll(false));
  }
}

export function* saveFacebook() {
  yield put(a.savingFacebook(true));
  try {
    const facebook = yield select(selectFacebook());
    yield call(axios.post, '/api/thirdParty/facebook', facebook);
    yield put(a.saveFacebookSuccess());
  } catch (error) {
    yield put(a.saveFacebookFailure(error));
  } finally {
    yield put(a.savingFacebook(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SAVE_FACEBOOK, saveFacebook);
  yield takeLatest(GET_ALL, getAll);
}
