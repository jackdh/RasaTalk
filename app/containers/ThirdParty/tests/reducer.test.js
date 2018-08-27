import { fromJS } from 'immutable';
import thirdPartyReducer from '../reducer';

describe('thirdPartyReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      facebook: {
        enabled: true,
        agent: '',
        access_token: '',
        verify_token: '',
      },
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(thirdPartyReducer(undefined, {})).toEqual(expected);
  });
});
