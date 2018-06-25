import { fromJS } from 'immutable';
import editNodeReducer from '../reducer';

describe('editNodeReducer', () => {
  it('returns the initial state', () => {
    expect(editNodeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
