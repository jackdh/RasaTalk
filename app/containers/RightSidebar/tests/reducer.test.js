import { fromJS } from 'immutable';
import rightSidebarReducer from '../reducer';

describe('rightSidebarReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      status: {
        available_projects: {},
      },

      project: localStorage.getItem('RightSidebar-agent')
        ? localStorage.getItem('RightSidebar-agent')
        : '',
      model: '',
      q: '',
      response: false, // {}
      sending: false,
      messages: [], // []
      typing: false,
    });
  });
  it('returns the initial state', () => {
    const expectedResult = state;
    expect(rightSidebarReducer(undefined, {})).toEqual(expectedResult);
  });
});
