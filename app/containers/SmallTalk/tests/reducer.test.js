import { fromJS } from 'immutable';
import smallTalkReducer from '../reducer';

describe('smallTalkReducer', () => {
  it('returns the initial state', () => {
    expect(smallTalkReducer(undefined, {})).toEqual(fromJS({}));
  });
});
