import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form/immutable';
import axios from 'axios';

import { GET_AGENT, ADD_INTENT, REMOVE_INTENTS } from './constants';

import * as a from './actions';

const debug = require('debug')('IntentPage\\saga.js');

function* getAgent({ agent }) {
  debug(`Adding Agent ${agent}`);
  yield put(a.gettingAgent(true));
  try {
    const { data } = yield axios.get(`/api/intents/${agent}`);
    yield put(a.getAgentSuccess(data));
  } catch (error) {
    yield put(a.getAgentFailure(error));
  } finally {
    yield put(a.gettingAgent(false));
  }
}

function* addIntent({ agent, intent, stay, resolve }) {
  debug('Adding Intent');
  yield put(a.addingIntent(true));

  try {
    yield call(axios.post, `/api/intents/${agent}`, { intent });

    yield put(a.addIntentSuccess(intent));
    if (stay) {
      yield put(reset('addIntent', 'intent'));
    } else {
      yield put(
        push(
          `/agents/${encodeURIComponent(agent)}/intent/${encodeURIComponent(
            intent,
          )}`,
        ),
      );
    }
  } catch (error) {
    yield put(
      a.addIntentFailure(
        "There was an error adding that intent. Perhaps It's a duplicate?",
      ),
    );
  } finally {
    yield put(a.addingIntent(false));
    resolve();
  }
}

function* removeIntent({ intents, agent }) {
  debug('Removing intents %o', intents);
  yield put(a.removingIntents(true));
  try {
    yield axios.post(`/api/delete/${agent}/intent`, intents);
    yield put(a.removeIntentsSuccess(intents));
  } finally {
    yield put(a.removingIntents(false));
  }
}

export default function* EditNodeSaga() {
  yield [
    takeLatest(GET_AGENT, getAgent),
    takeLatest(ADD_INTENT, addIntent),
    takeLatest(REMOVE_INTENTS, removeIntent),
  ];
}
