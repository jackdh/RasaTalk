import { put, takeLatest, select, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';
import * as a from './actions';
import {
  GET_EXPRESSION,
  ADD_EXPRESSION,
  REMOVE_EXPRESSION,
  ADD_PARAMETER,
  REMOVE_PARAMETER,
  GET_ENTITIES,
  SAVE_UPDATED_INTENT_NAME,
} from './constants';
import { selectIntent, selectOriginal } from './selectors';
const debug = require('debug')('Expression Saga');

export function* getExpression({ agent, intent }) {
  debug(`Getting expressions for ${agent}/${intent}`);

  yield a.gettingExpression(true);

  try {
    const { data } = yield axios.get(
      `/api/expression/${agent}/intent/${intent}`,
    );
    yield put(a.getExpressionsSuccess(data));
  } catch (error) {
    yield put(
      a.getExpressionFailure(
        `Failed to get expressions for ${agent}/${intent}`,
      ),
    );
  } finally {
    yield put(a.gettingExpression(false));
  }
}

export function* addExpression({
  agent,
  intent,
  expressions,
  resolve,
  reject,
}) {
  debug('Adding Expression: %O', expressions);
  yield put(a.addingExpression(true));

  try {
    yield axios.post(`/api/expression/${agent}/intent/${intent}`, {
      expressions,
    });
    yield put(a.addExpressionSuccess(expressions));
    resolve();
  } catch (error) {
    yield put(a.addExpressionFailure(error));
    reject('Failed adding those expressions');
  } finally {
    yield put(a.addingExpression(false));
  }
}

export function* removeExpressions({ agent, intent, expressions }) {
  debug('Removing expressions: %O', expressions);
  yield put(a.removingExpression(true));
  try {
    yield axios.post(
      `/api/delete/${agent}/intent/${intent}/expressions`,
      expressions,
    );
    yield put(a.removeExpressionSuccess(expressions));
  } catch (error) {
    yield put(a.removeExpressionFailure('Failed to remove those expressions'));
  } finally {
    yield put(a.removingExpression(false));
  }
}

export function* addParameter({ agent, intent, entity }) {
  debug('Adding parameter for entity: %O', entity);
  yield put(a.addingParameter(true));

  try {
    yield axios.post(`/api/parameters/${agent}/${intent}/`, entity);
    debug('Adding entity success');
    yield put(a.addParameterSuccess(entity));
  } catch (error) {
    yield put(a.addParameterFailure('Failed adding that expression'));
    debug('Adding entity failure');
  } finally {
    yield put(a.addingParameter(false));
  }
}

export function* removeParameter({ entity }) {
  const { _id, start, end } = entity;
  debug('Removing parameter %O', entity);
  yield put(a.removingParameter(true));

  try {
    yield axios.delete(`/api/delete/parameters/${_id}/${start}/${end}`);

    debug('Removing parameter success');
    yield put(a.removeParameterSuccess(entity));
  } catch (error) {
    debug('Removing parameter failure');
    yield put(a.removeParameterFailure('Failed removing that parameter'));
  } finally {
    yield put(a.removingParameter(false));
  }
}

export function* getEntities() {
  debug('Getting Entities');

  yield put(a.gettingExpression(true));
  try {
    const { data } = yield axios.get('/api/entities');
    yield put(a.getEntitiesSuccess(data));
  } catch (error) {
    yield put(a.getEntitiesFailure('Failed getting entities.'));
  } finally {
    yield put(a.gettingExpression(false));
  }
}

export function* updateIntentName({ agent }) {
  debug('updating Intent name');

  yield put(a.savingUpdatedIntentName(true));
  try {
    const intent = yield select(selectIntent());
    const originalIntent = yield select(selectOriginal());
    yield call(axios.patch, `/api/intents/${agent}/intent/${originalIntent}`, {
      intent,
    });
    yield put(a.setIntentName(intent));
    yield put(push(`/agents/${agent}/intent/${intent}`));
  } catch (error) {
    debug(error.message);
  } finally {
    yield put(a.savingUpdatedIntentName(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(ADD_EXPRESSION, addExpression),
    takeLatest(GET_EXPRESSION, getExpression),
    takeLatest(REMOVE_EXPRESSION, removeExpressions),
    takeLatest(GET_ENTITIES, getEntities),
    takeLatest(ADD_PARAMETER, addParameter),
    takeLatest(REMOVE_PARAMETER, removeParameter),
    takeLatest(SAVE_UPDATED_INTENT_NAME, updateIntentName),
  ];
}
