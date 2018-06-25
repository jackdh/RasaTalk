import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_SYNONYMS,
  UPDATE_VARIANTS,
  ADD_SYNONYMS,
  REMOVE_SYNONYMS,
} from './constants';

import * as a from './actions';

function* getSynonyms({ entity }) {
  yield put(a.gettingSynonyms(true));
  try {
    const { data } = yield call(axios.get, `/api/synonyms/${entity}`);
    yield put(a.getSynonymsSuccess(data));
  } catch (error) {
    yield put(a.getSynonymsFailure(error.response.message));
  } finally {
    yield put(a.gettingSynonyms(false));
  }
}

function* updateVariants({ entity, synonym, variants }) {
  yield put(a.updatingVariants(true));
  try {
    yield call(axios.post, `/api/variants/${entity}`, { synonym, variants });
  } catch (error) {
    yield put(a.updateVariantsFailure(error.response.message));
  } finally {
    yield put(a.updatingVariants(false));
  }
}

function* addSynonyms({ entity, synonym, resolve }) {
  yield put(a.addingSynonyms(true));
  try {
    yield call(axios.post, `/api/synonyms/${entity}/${synonym}`);
    yield put(a.addSynonymsSuccess(synonym));
    resolve();
  } catch (error) {
    yield put(a.addSynonymsFailure(error.response.message));
  } finally {
    yield put(a.addingSynonyms(false));
  }
}

function* removeSynonyms({ entity, synonyms }) {
  yield put(a.removingSynonyms(true));
  try {
    yield call(axios.post, `/api/delete/synonyms/${entity}`, { synonyms });
    yield put(a.removeSynonymsSuccess(synonyms));
  } catch (error) {
    yield put(a.removeSynonymsFailure(error.response.message));
  } finally {
    yield put(a.removingSynonyms(false));
  }
}

// Individual exports for testing
export default function* synonymsSaga() {
  yield [
    takeLatest(GET_SYNONYMS, getSynonyms),
    takeLatest(UPDATE_VARIANTS, updateVariants),
    takeLatest(ADD_SYNONYMS, addSynonyms),
    takeLatest(REMOVE_SYNONYMS, removeSynonyms),
  ];
}
