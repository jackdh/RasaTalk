/*
 *
 * ThirdParty actions
 *
 */

import * as c from './constants';

export const updateForm = (value, name) => ({
  type: c.UPDATE_FORM,
  value,
  name,
});

export const getAll = () => ({ type: c.GET_ALL });
export const gettingAll = toggle => ({ type: c.GETTING_ALL, toggle });
export const getAllSuccess = data => ({ type: c.GET_ALL_SUCCESS, data });
export const getAllFailure = error => ({
  type: c.GET_ALL_FAILURE,
  error,
});

export const saveFacebook = () => ({ type: c.SAVE_FACEBOOK });
export const savingFacebook = toggle => ({ type: c.SAVING_FACEBOOK, toggle });
export const saveFacebookSuccess = () => ({ type: c.SAVE_FACEBOOK_SUCCESS });
export const saveFacebookFailure = error => ({
  type: c.SAVE_FACEBOOK_FAILURE,
  error,
});

export const saveTelegram = () => ({ type: c.SAVE_TELEGRAM });
export const savingTelegram = toggle => ({ type: c.SAVING_TELEGRAM, toggle });
export const saveTelegramSuccess = () => ({ type: c.SAVE_TELEGRAM_SUCCESS });
export const saveTelegramFailure = error => ({
  type: c.SAVE_TELEGRAM_FAILURE,
  error,
});
