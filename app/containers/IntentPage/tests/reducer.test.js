import { fromJS } from 'immutable';
import intentPageReducer from '../reducer';

describe('intentPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      gettingIntents: false,
      intents: [],
      error: '',
      loadingAgent: true,
      addingIntent: false,
      removingIntent: false,
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(intentPageReducer(undefined, {})).toEqual(expected);
  });
});
