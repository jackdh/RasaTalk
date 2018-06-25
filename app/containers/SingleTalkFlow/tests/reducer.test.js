import { fromJS } from 'immutable';
import talkFlowReducer from '../reducer';

describe('talkFlowReducer', () => {
  it('returns the initial state', () => {
    expect(talkFlowReducer(undefined, {})).toEqual(fromJS({}));
  });
});
