import { fromJS } from 'immutable';
import rightSidebarReducer from '../reducer';

describe('rightSidebarReducer', () => {
  it('returns the initial state', () => {
    expect(rightSidebarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
