import { fromJS } from 'immutable';
import TalkWrapperReducer from '../reducer';

describe('TalkWrapperReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      adding: false,
      groups: [],
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(TalkWrapperReducer(undefined, {})).toEqual(expected);
  });
});
