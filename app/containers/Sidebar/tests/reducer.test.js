import { fromJS } from 'immutable';
import sidebarReducer from '../reducer';

describe('sidebarReducer', () => {
  it('returns the initial state', () => {
    expect(sidebarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
