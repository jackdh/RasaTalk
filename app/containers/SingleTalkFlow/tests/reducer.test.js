import { fromJS } from 'immutable';
import talkFlowReducer from '../reducer';

describe('talkFlowReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      node: '',
      editNode: '',

      name: '',
      uid: '',
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
    expect(talkFlowReducer(undefined, {})).toEqual(expected);
  });
});
