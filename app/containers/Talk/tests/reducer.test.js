import { fromJS } from 'immutable';
import talkReducer from '../reducer';

describe('talkReducer', () => {
  it('returns the initial state', () => {
    expect(talkReducer(undefined, {})).toEqual(fromJS({}));
  });
});
