import { fromJS } from 'immutable';
import nodeWrapperReducer from '../reducer';

describe('nodeWrapperReducer', () => {
  it('returns the initial state', () => {
    expect(nodeWrapperReducer(undefined, {})).toEqual(fromJS({}));
  });
});
