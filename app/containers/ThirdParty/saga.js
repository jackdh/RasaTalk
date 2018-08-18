import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  SAVE_FACEBOOK,
  SAVE_SLACK,
  SAVE_MICROSOFT_TEAMS,
  SAVE_TELEGRAM,
  GET_ALL,
} from './constants';
import * as a from './actions';
import {
  selectFacebook,
  selectSlack,
  selectMicrosoftTeams,
  selectTelegram,
} from './selectors';

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

export function* saveSlack() {
  yield put(a.savingSlack(true));
  try {
    const slack = yield select(selectSlack());
    yield call(axios.post, '/api/thirdParty/slack', slack);
    yield put(a.saveSlackSuccess());
  } catch (error) {
    yield put(a.saveSlackFailure(error));
  } finally {
    yield put(a.savingSlack(false));
  }
}

export function* saveMicrosoftTeams() {
  yield put(a.savingMicrosoftTeams(true));
  try {
    const microsoftTeams = yield select(selectMicrosoftTeams());
    yield call(axios.post, '/api/thirdParty/microsoftTeams', microsoftTeams);
    yield put(a.saveMicrosoftTeamsSuccess());
  } catch (error) {
    yield put(a.saveMicrosoftTeamsFailure(error));
  } finally {
    yield put(a.savingMicrosoftTeams(false));
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
  yield takeLatest(SAVE_SLACK, saveSlack);
  yield takeLatest(SAVE_MICROSOFT_TEAMS, saveMicrosoftTeams);
  yield takeLatest(SAVE_TELEGRAM, saveTelegram);
  yield takeLatest(GET_ALL, getAll);
}
