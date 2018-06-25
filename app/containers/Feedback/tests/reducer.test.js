import { fromJS } from 'immutable';
import feedbackReducer from '../reducer';

describe('feedbackReducer', () => {
  it('returns the initial state', () => {
    expect(feedbackReducer(undefined, {})).toEqual(fromJS({}));
  });
});
