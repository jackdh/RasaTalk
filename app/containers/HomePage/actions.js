/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

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
