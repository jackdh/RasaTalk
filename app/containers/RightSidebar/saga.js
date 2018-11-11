import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

import { selectInfo } from './selectors';
import { GET_STATUS, SEND_QUERY } from './constants';
import * as a from './actions';

export function* getStatus() {
  yield put(a.gettingStatus(true));
  try {
    const { data } = yield call(axios.get, '/api/training/rasa');
    yield put(a.getStatusSuccess(data));
  } catch (e) {
    yield put(a.getStatusFailure('Is rasa down?'));
  } finally {
    yield put(a.gettingStatus(false));
  }
}

export function* sendQuery() {
  yield put(a.sendingQuery(true));
  const values = yield select(selectInfo());
  try {
    const { data } = yield call(
      axios.post,
      `/api/training/parse/${values.project}`,
      values,
    );
    yield put(a.sendQuerySuccess(data));
  } catch (e) {
    yield put(a.sendQueryFailure(e.response.message));
  } finally {
    yield put(a.sendingQuery(false));
  }
}

export default function* TrainingSaga() {
  yield takeLatest(GET_STATUS, getStatus);
  yield takeLatest(SEND_QUERY, sendQuery);
}
