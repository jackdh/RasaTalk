/* eslint-disable no-param-reassign */
import { put, takeLatest, call } from 'redux-saga/effects';
import _debug from 'debug';
import axios from 'axios';
import { push } from 'connected-react-router/immutable';

import {
  SAVE_AGENT,
  GET_AGENTS,
  UPDATE_AGENT,
  DELETE_AGENT,
} from './constants';
import * as a from './actions';

const debug = _debug('Agents\\saga.js');

export function* getAgents({ skip = false }) {
  debug('Getting Agents');

  if (!skip) yield put(a.gettingAgent(true));

  try {
    const { data } = yield axios.get('/api/agents');
    yield put(a.gettingAgentsSuccess(data));
  } catch (error) {
    debug('failed getting agents: %o', error);
    yield put(a.gettingAgentsFailure(error));
  } finally {
    if (!skip) yield put(a.gettingAgent(false));
  }
}

// Individual exports for testing
export function* saveAgent({ agent, reset }) {
  debug('Saving a new Agent');
  yield put(a.savingAgent(true));

  try {
    yield axios.put('/api/agents', agent);
    yield call(getAgents, { skip: true });
    reset();
  } catch (error) {
    debug('failed saving agent: %o', error);
    yield put(a.saveAgentFailure(error));
  } finally {
    yield put(a.savingAgent(false));
  }
}

export function* updateAgent({ agent, close }) {
  debug('Saving a new Agent');
  yield put(a.updatingAgent(true));
  try {
    yield axios.post(`/api/agents/${agent._id}`, agent);
    yield call(getAgents, { skip: true });
    close();
  } catch (error) {
    debug('failed saving agent: %o', error);
  } finally {
    yield put(a.updatingAgent(false));
  }
}

export function* deleteAgent({ agent }) {
  debug('Deleting agent');

  yield put(a.deletingAgent(true));
  try {
    yield axios.delete(`/api/agents/${agent}`);
    yield call(getAgents, { skip: true });
    yield put(push('/agents'));
  } catch (error) {
    yield put(a.saveAgentFailure('Sorry something went wrong deleting that.'));
  } finally {
    yield put(a.deletingAgent(false));
  }
}

export default function* AgentSaga() {
  yield takeLatest(SAVE_AGENT, saveAgent);
  yield takeLatest(UPDATE_AGENT, updateAgent);
  yield takeLatest(GET_AGENTS, getAgents);
  yield takeLatest(DELETE_AGENT, deleteAgent);
}
