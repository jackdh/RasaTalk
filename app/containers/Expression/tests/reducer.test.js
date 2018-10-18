import { fromJS } from 'immutable';
import expressionReducer from '../reducer';

describe('expressionReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      expressions: [],
      entities: [],
      loading: true,
      error: '',

      intentName: '',
      originalIntentName: '',
      updatingIntentName: false,
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(expressionReducer(undefined, {})).toEqual(expected);
  });
});
