import { fromJS } from 'immutable';
import intentPageReducer from '../reducer';

describe('intentPageReducer', () => {
  it('returns the initial state', () => {
    expect(intentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
