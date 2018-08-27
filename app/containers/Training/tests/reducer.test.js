import { fromJS } from 'immutable';
import trainingReducer from '../reducer';

describe('trainingReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: true,
      loadingError: '',
      getting: false,
      json: {},
      training: [],
      inTraining: false,
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(trainingReducer(undefined, {})).toEqual(expected);
  });
});
