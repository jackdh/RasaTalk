import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */
const selectForm = state => state.get('form');

const makeSelectLogin = () =>
  createSelector(selectForm, formState => formState.getIn('Login', 'values'));

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => {
    const toJS = substate.toJS();
    return toJS;
  });

export {
  selectForm,
  makeSelectLogin,
  selectLoginPageDomain,
  makeSelectLoginPage,
};
