/*
 *
 * ThirdParty reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  facebook: {
    enabled: false,
    agent: '',
    access_token: '',
    verify_token: '',
  },
  slack: {
    enabled: false,
    agent: '',
    client_id: '',
    client_secret: '',
  },
  microsoftTeams: {
    enabled: false,
    agent: '',
    client_id: '',
    client_secret: '',
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
       * TODO This is awful however I cannot think of a succinct way to do this yet for all TP's.
       */
      let newState = state;
      action.data.forEach(item => {
        if (item.type === 'facebook') {
          newState = newState.setIn(['facebook', 'enabled'], item.enabled);
          newState = newState.setIn(['facebook', 'agent'], item.agent);
          newState = newState.setIn(
            ['facebook', 'access_token'],
            item.access_token,
          );
          newState = newState.setIn(
            ['facebook', 'verify_token'],
            item.verify_token,
          );
        } else if (item.type === 'slack') {
          newState = newState.setIn(['slack', 'enabled'], item.enabled);
          newState = newState.setIn(['slack', 'agent'], item.agent);
          newState = newState.setIn(['slack', 'client_id'], item.client_id);
          newState = newState.setIn(
            ['slack', 'client_secret'],
            item.client_secret,
          );
        } else if (item.type === 'microsoftTeams') {
          newState = newState.setIn(
            ['microsoftTeams', 'enabled'],
            item.enabled,
          );
          newState = newState.setIn(['microsoftTeams', 'agent'], item.agent);
          newState = newState.setIn(
            ['microsoftTeams', 'client_id'],
            item.client_id,
          );
          newState = newState.setIn(
            ['microsoftTeams', 'client_secret'],
            item.client_secret,
          );
        }
      });
      return newState;
    }
    case c.SAVING_FACEBOOK:
      return state.setIn(['facebook', 'saving'], action.toggle);
    case c.SAVE_FACEBOOK_SUCCESS:
      return state.setIn(['facebook', 'touched'], false);
    case c.SAVING_SLACK:
      return state.setIn(['slack', 'saving'], action.toggle);
    case c.SAVE_SLACK_SUCCESS:
      return state.setIn(['slack', 'touched'], false);
    case c.SAVING_MICROSOFT_TEAMS:
      return state.setIn(['microsoftTeams', 'saving'], action.toggle);
    case c.SAVE_MICROSOFT_TEAMS_SUCCESS:
      return state.setIn(['microsoftTeams', 'touched'], false);
    default:
      return state;
  }
}

export default thirdPartyReducer;
