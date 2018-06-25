import { fromJS } from 'immutable';
import agentsReducer from '../reducer';

describe('agentsReducer', () => {
  it('returns the initial state', () => {
    expect(agentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
