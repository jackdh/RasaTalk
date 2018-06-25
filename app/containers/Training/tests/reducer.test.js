import { fromJS } from 'immutable';
import trainingReducer from '../reducer';

describe('trainingReducer', () => {
  it('returns the initial state', () => {
    expect(trainingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
