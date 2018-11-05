/*
 *
 * Chatbot reducer
 *
 */

import { fromJS, List } from 'immutable';
import * as c from './constants';

const uuidv1 = require('uuid/v1');

export const initialState = fromJS({
  input: '',
  sending: false,
  uuid: uuidv1(),
  messages: [],
  talkWrapper: '',
});

function chatbotReducer(state = initialState, action) {
  switch (action.type) {
    case c.SET_TALKWRAPPER:
      return state.set('talkWrapper', action.talkWrapper);
    case c.UPDATE_INPUT:
      return state.set('input', action.input);
    case c.CLEAR_INPUT:
      return state.set('messages', List([])).set('uuid', uuidv1());

    case c.SENDING_INPUT:
      return state.set('sending', action.toggle).set('input', '');

    case c.RESET:
      return state.set('messages', []).set('uuid', uuidv1());

    case c.ADD_MESSAGE:
      return state.update('messages', messages => {
        const m = messages.toJS();
        if (m[0] && m[0][0].type === action.message.type) {
          m[0].push(action.message);
        } else {
          m.unshift([action.message]);
        }
        return fromJS(m);
      });
    case c.MESSAGE_SUCCESS:
      return state;

    default:
      return state;
  }
}

export default chatbotReducer;
