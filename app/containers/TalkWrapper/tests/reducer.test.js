import { fromJS } from 'immutable';
import TalkWrapperReducer from '../reducer';

describe('TalkWrapperReducer', () => {
  it('returns the initial state', () => {
    expect(TalkWrapperReducer(undefined, {})).toEqual(fromJS({}));
  });
});
