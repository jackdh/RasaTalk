import { fromJS } from 'immutable';
import chatbotReducer from '../reducer';

describe('chatbotReducer', () => {
  it('returns the initial state', () => {
    expect(chatbotReducer(undefined, {})).toEqual(fromJS({}));
  });
});
