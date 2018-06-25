import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { GET_ENTITIES, ADD_ENTITY, REMOVE_ENTITIES } from './constants';
import * as a from './actions';

function* getEntities() {
  yield put(a.gettingEntities(true));

  try {
    const { data } = yield call(axios.get, '/api/entities');
    yield put(a.getEntitiesSuccess(data));
  } catch (error) {
    yield put(a.getEntitiesFailure(error));
  } finally {
    yield put(a.gettingEntities(false));
  }
}

function* addEntity({ entity, resolve }) {
  yield put(a.addingEntity(true));

  try {
    yield call(axios.post, '/api/entities', { entity });
    yield put(a.addEntitySuccess(entity));
    resolve();
  } catch (error) {
    yield put(a.addEntityFailure(error.response.data));
  } finally {
    yield put(a.addingEntity(false));
  }
}

function* removeEntities({ entities }) {
  yield put(a.removingEntities(true));
  try {
    yield call(axios.post, '/api/delete/entities/', { entities });
    yield put(a.removeEntitiesSuccess(entities));
  } catch (error) {
    yield put(a.addEntityFailure(error.response.data));
  } finally {
    yield put(a.removingEntities(false));
  }
}

export default function* TrainingSaga() {
  yield takeLatest(GET_ENTITIES, getEntities);
  yield takeLatest(ADD_ENTITY, addEntity);
  yield takeLatest(REMOVE_ENTITIES, removeEntities);
}
