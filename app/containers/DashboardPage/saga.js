import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  gettingDashboard,
  getDashboardRasa,
  getDashboardStats,
  getDashboardFailure,
} from './actions';
import { GET_DASHBOARD } from './constants';

export function* get() {
  yield put(gettingDashboard(true));

  try {
    const { data } = yield call(axios.get, '/api/stats');
    yield put(getDashboardStats(data));
    const rasa = yield call(axios.get, '/api/stats/rasa');
    yield put(getDashboardRasa(rasa.data));
  } catch (error) {
    yield put(getDashboardFailure(error));
  } finally {
    yield put(gettingDashboard(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(GET_DASHBOARD, get);
}
