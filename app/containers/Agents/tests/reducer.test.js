import { fromJS } from 'immutable';
import agentsReducer from '../reducer';

describe('agentsReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      agents: [],
      loading: true,
      saving: false,
      saveError: '',
      loadingError: '',
      edit: false,
      oldNode: '',
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(agentsReducer(undefined, {})).toEqual(expected);
  });
});
