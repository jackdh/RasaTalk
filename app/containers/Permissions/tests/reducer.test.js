import { fromJS } from 'immutable';
import permissionsReducer from '../reducer';

describe('permissionsReducer', () => {
  it('returns the initial state', () => {
    expect(permissionsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
