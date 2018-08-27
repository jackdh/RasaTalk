import { fromJS } from 'immutable';
import synonymsReducer from '../reducer';

describe('synonymsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      synonyms: [],
      error: '',
      addingSyn: false,
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(synonymsReducer(undefined, {})).toEqual(expectedResult);
  });
});
