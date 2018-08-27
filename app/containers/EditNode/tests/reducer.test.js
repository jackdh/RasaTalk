import { fromJS } from 'immutable';
import editNodeReducer from '../reducer';

describe('editNodeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(editNodeReducer(undefined, {})).toEqual(expected);
  });
});
