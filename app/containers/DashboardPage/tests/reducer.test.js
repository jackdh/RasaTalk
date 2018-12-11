import { fromJS } from 'immutable';
import dashboardPageReducer from '../reducer';

describe('dashboardPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      stats: {},
      rasa: {
        online: true,
      },
    });
  });
  it('returns the initial state', () => {
    const expectedResult = state;
    expect(dashboardPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
