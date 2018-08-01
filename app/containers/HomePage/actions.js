import * as c from './constants';

/**
 * Changes the title of drawer
 *
 *  This is fired each time the user changes page.
 *
 * @param  {name} name The new title of the drawer
 *
 * @return {object}    An action object with a type of CHANGE_TITLE
 */
export function changeTitle(title) {
  return {
    type: c.CHANGE_TITLE,
    title: decodeURIComponent(title),
  };
}

export const setUser = user => ({
  type: c.SET_USER,
  user,
});

export const showSnackbar = (message, props) => ({
  type: c.SHOW_SNACKBAR,
  message,
  props,
});

export const hideSnackbar = () => ({
  type: c.HIDE_SNACKBAR,
});

export const getAgents = () => ({ type: c.GET_AGENTS });
export const gettingAgent = loading => ({ type: c.GETTING_AGENTS, loading });
export const gettingAgentsSuccess = agents => ({
  type: c.GETTING_AGENTS_SUCCESS,
  agents,
});
export const gettingAgentsFailure = error => ({
  type: c.GETTING_AGENTS_FAILURE,
  error,
});
