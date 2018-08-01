/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

const DEFAULT = 'app/Home/';

export const CHANGE_USERNAME = `${DEFAULT}CHANGE_USERNAME`;
export const CHANGE_TITLE = `${DEFAULT}CHANGE_TITLE`;
export const SET_USER = `${DEFAULT}SET_USER`;

export const SHOW_SNACKBAR = `${DEFAULT}SHOW_SNACKBAR`;
export const HIDE_SNACKBAR = `${DEFAULT}HIDE_SNACKBAR`;

export const REMOVE_LOGIN_TOKEN = `${DEFAULT}REMOVE_LOGIN_TOKEN`;

export const GET_AGENTS = `${DEFAULT}GET_AGENTS`;
export const GETTING_AGENTS = `${DEFAULT}GETTING_AGENTS`;
export const GETTING_AGENTS_SUCCESS = `${DEFAULT}GETTING_AGENTS_SUCCESS`;
export const GETTING_AGENTS_FAILURE = `${DEFAULT}GETTING_AGENTS_FAILURE`;
