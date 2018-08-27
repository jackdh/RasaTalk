import { fromJS } from 'immutable';
import loginPageReducer from '../reducer';
import Auth from '../Auth';

describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loggedIn: Auth.isUserAuthenticated(),
      loading: false,
      loginError: '',
      registerError: '',
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(loginPageReducer(undefined, {})).toEqual(expected);
  });
});
