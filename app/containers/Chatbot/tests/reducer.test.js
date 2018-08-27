import { fromJS } from 'immutable';
import chatbotReducer from '../reducer';
const uuidv1 = require('uuid/v1');
describe('chatbotReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      input: '',
      sending: false,
      uuid: uuidv1(),
      messages: [],
    });
  });
  it('returns the initial state', () => {
    const expected = state;
    expect(chatbotReducer(undefined, {})).toEqual(expected);
  });
});
