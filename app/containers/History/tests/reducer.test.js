import { fromJS } from 'immutable';
import historyReducer from '../reducer';

describe('historyReducer', () => {
  it('returns the initial state', () => {
    expect(historyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
