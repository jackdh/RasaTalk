import { fromJS } from 'immutable';
import talkFlowReducer from '../reducer';

describe('talkFlowReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      editNode: '',

      name: '',
      parentNode: '',
      children: [],
      enabled: false,

      details: {
        responses: 0,
        slots: 0,
      },
      error: '',
      loading: true,
      selectedNode: '',
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    const reducer = talkFlowReducer(undefined, {});
    expect(reducer).toEqual(expected);
  });
});
