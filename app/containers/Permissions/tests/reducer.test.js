import { fromJS } from 'immutable';
import permissionsReducer from '../reducer';

describe('permissionsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      groups: [],
      roles: [],
      permissions: [],
      users: [],
      loading: true,
      savingRole: false,
      savingGroup: false,
      savingUser: false,
      error: '',
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(permissionsReducer(undefined, {})).toEqual(expected);
  });
});
