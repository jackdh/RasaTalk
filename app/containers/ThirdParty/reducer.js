/*
 *
 * ThirdParty reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  facebook: {
    enabled: true,
    agent: '',
    talkWrapper: '',
    access_token: '',
    verify_token: '',
  },
});

function thirdPartyReducer(state = initialState, action) {
  switch (action.type) {
    case c.UPDATE_FORM:
      return state
        .setIn(action.name.split('.'), action.value)
        .setIn([action.name.split('.')[0], 'touched'], true);
    case c.GET_ALL_SUCCESS: {
      /**
       * TODO This is awfull however I cannot think of a succinct way to do this yet for all TP's.
       */
      let newState = state;
      action.data.forEach(item => {
        if (item.type === 'facebook') {
          newState = newState.setIn(['facebook', 'enabled'], item.enabled);
          newState = newState.setIn(['facebook', 'agent'], item.agent);
          newState = newState.setIn(
            ['facebook', 'talkWrapper'],
            item.talkWrapper,
          );
          newState = newState.setIn(
            ['facebook', 'access_token'],
            item.access_token,
          );
          newState = newState.setIn(
            ['facebook', 'verify_token'],
            item.verify_token,
          );
        }
      });
      return newState;
    }
    case c.SAVING_FACEBOOK:
      return state.setIn(['facebook', 'saving'], action.toggle);
    case c.SAVE_FACEBOOK_SUCCESS:
      return state.setIn(['facebook', 'touched'], false);
    default:
      return state;
  }
}

export default thirdPartyReducer;
