/*
 *
 * LoginPage actions
 *
 */

import * as c from './constants';

export const loginRequest = () => ({
  type: c.LOGIN_REQUEST,
});

export const registerRequest = () => ({
  type: c.REGISTER_REQUEST,
});

export const registerRequestFailure = error => ({
  type: c.REGISTER_REQUEST_ERROR,
  error,
});

export const loginRequestFailure = error => ({
  type: c.LOGIN_REQUEST_ERROR,
  error,
});

export const loading = toggle => ({
  type: c.SET_LOADING,
  toggle,
});
