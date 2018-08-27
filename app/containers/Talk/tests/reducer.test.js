import { fromJS } from 'immutable';
import talkReducer from '../reducer';

describe('talkReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      parentsLoaded: false,
      errorMessage: '',
      parents: [],
      loading: true,
      goTo: '',
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(talkReducer(undefined, {})).toEqual(expected);
  });
});
