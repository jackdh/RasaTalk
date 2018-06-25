import { fromJS } from 'immutable';
import expressionReducer from '../reducer';

describe('expressionReducer', () => {
  it('returns the initial state', () => {
    expect(expressionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
