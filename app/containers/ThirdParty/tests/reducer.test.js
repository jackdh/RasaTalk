import { fromJS } from 'immutable';
import thirdPartyReducer from '../reducer';

describe('thirdPartyReducer', () => {
  it('returns the initial state', () => {
    expect(thirdPartyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
