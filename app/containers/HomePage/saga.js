import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { GET_AGENTS } from './constants';
import * as a from './actions';

const debug = require('debug')('Homepage/Saga');

export function* getAgents() {
  debug('Getting Agents');

  yield put(a.gettingAgent(true));

  try {
    const { data } = yield call(axios.get, '/api/agents');
    yield put(a.gettingAgentsSuccess(data));
  } catch (error) {
    debug('failed getting agents: %o', error);
    yield put(a.gettingAgentsFailure(error));
  } finally {
    yield put(a.gettingAgent(false));
  }
}

export default function* HomepageSaga() {
  yield takeLatest(GET_AGENTS, getAgents);
}
