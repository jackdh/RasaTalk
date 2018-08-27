import { fromJS } from 'immutable';
import entitiesReducer from '../reducer';

describe('entitiesReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      entities: [],
      addingEntity: false,
      entityError: '',
      loading: false,
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(entitiesReducer(undefined, {})).toEqual(expected);
  });
});
