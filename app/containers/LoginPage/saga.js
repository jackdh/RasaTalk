import { call, put, race, select, take, takeLatest } from 'redux-saga/effects';
import _debug from 'debug';
import axios from 'axios';
import { formValueSelector } from 'redux-form/immutable';

import {
  LOGIN_REQUEST,
  LOGOUT,
  SET_AUTH,
  SET_LOADING,
  REGISTER_REQUEST,
} from './constants';
import Auth from './Auth';
import {
  loginRequestFailure,
  loading,
  registerRequestFailure,
} from './actions';

const debug = _debug('LoginPage/saga.js');
const selector = formValueSelector('loginPage');
const registerSelector = formValueSelector('registerPage');

export function* authorise() {
  debug('Authorise: going to set sending to true');
  yield put(loading(true));
  try {
    const { email, password } = yield select(state =>
      selector(state, 'email', 'password'),
    ); // <-- get the project
    debug('Authorise: Got username %s and password %s', email, password);
    const {
      data: { token, user },
    } = yield call(axios.post, '/auth/login', { email, password });
    return { success: true, token, user };
  } catch ({ request: { response } }) {
    debug('Authorise: We got an error %O', response);
    const error = JSON.parse(response).message;
    yield put(loginRequestFailure(error));
    return { success: false };
  } finally {
    yield put(loading(false));
  }
}

/**
 * Log in saga
 */
// eslint-disable-next-line consistent-return
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"

  // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
  debug('LoginFlow: Starting LoginFlow');
  // const request = yield take(LOGIN_REQUEST);
  yield put({ type: SET_LOADING, loading: true });
  // debug('LoginFlow: We have got a request: %o', request);
  // A `REMOVE_LOGIN_TOKEN` action may happen while the `authorize` effect is going on, which may
  // lead to a race condition. This is unlikely, but just in case, we call `race` which
  // returns the "winner", i.e. the one that finished first
  try {
    const winner = yield race({
      auth: call(authorise, { isRegistering: false }),
      logout: take(LOGOUT),
    });

    // If `authorize` was the winner...
    if (winner.auth.success) {
      debug('LoginFlow: We have authenticated! %o', winner);
      Auth.authenticateUser(winner.auth);
      yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
      debug('LoginFlow: We have set the form. ');
      return true;
    }
  } finally {
    yield put({ type: SET_LOADING, loading: false });
  }
}

// eslint-disable-next-line consistent-return
export function* registerFlow() {
  debug('Registering: Starting Registration');
  yield put(loading(true));
  try {
    const { email, password, repeatPassword, name } = yield select(state =>
      registerSelector(state, 'email', 'password', 'repeatPassword', 'name'),
    ); // <-- get the project
    debug(
      'Registering: Got username %s and password %s and repeat %s',
      email,
      password,
      repeatPassword,
    );
    const {
      data: { token, user },
    } = yield call(axios.post, '/auth/signup', {
      email,
      password,
      repeatPassword,
      name,
    });

    Auth.authenticateUser({ token, user });
    yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
  } catch ({ request: { response } }) {
    debug('Registering: We got an error %O', response);
    yield put(registerRequestFailure(JSON.parse(response).message));
    return { success: false };
  } finally {
    yield put(loading(false));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  debug('In defaultSag');
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN_REQUEST, loginFlow);
  yield takeLatest(REGISTER_REQUEST, registerFlow);
}
