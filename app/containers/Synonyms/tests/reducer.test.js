import { fromJS } from 'immutable';
import synonymsReducer from '../reducer';

describe('synonymsReducer', () => {
  it('returns the initial state', () => {
    expect(synonymsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
