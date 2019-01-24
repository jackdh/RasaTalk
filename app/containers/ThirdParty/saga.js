import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { SAVE_FACEBOOK, GET_ALL, SAVE_TELEGRAM } from './constants';
import * as a from './actions';
import { selectFacebook, selectTelegram } from './selectors';

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

export function* saveTelegram() {
  yield put(a.savingTelegram(true));
  try {
    const telegram = yield select(selectTelegram());
    yield call(axios.post, '/api/thirdParty/telegram', telegram);
    yield put(a.saveTelegramSuccess());
  } catch (error) {
    yield put(a.saveTelegramFailure(error));
  } finally {
    yield put(a.savingTelegram(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SAVE_FACEBOOK, saveFacebook);
  yield takeLatest(SAVE_TELEGRAM, saveTelegram);
  yield takeLatest(GET_ALL, getAll);
}
