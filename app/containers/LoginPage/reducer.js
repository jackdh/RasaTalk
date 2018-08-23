/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import _debug from 'debug';
import {
  SET_AUTH,
  SET_LOADING,
  LOGIN_REQUEST_ERROR,
  REGISTER_REQUEST_ERROR,
} from './constants';
import Auth from './Auth';

const debug = _debug('LoginPage/reducer');

export const initialState = fromJS({
  loggedIn: Auth.isUserAuthenticated(),
  loading: false,
  loginError: '',
  registerError: '',
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      debug('Setting Auth %o', action);
      return state.set('loggedIn', action.newAuthState);
    case SET_LOADING:
      debug('Setting loading %o', action);
      return state.set('loading', action.toggle);
    case LOGIN_REQUEST_ERROR:
      return state.set('loginError', action.error);
    case REGISTER_REQUEST_ERROR:
      return state.set('registerError', action.error);
    default:
      return state;
  }
}

export default loginPageReducer;
