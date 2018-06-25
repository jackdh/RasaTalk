import { fromJS } from 'immutable';
import entitiesReducer from '../reducer';

describe('entitiesReducer', () => {
  it('returns the initial state', () => {
    expect(entitiesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
