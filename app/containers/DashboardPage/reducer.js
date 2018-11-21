/*
 *
 * DashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_DASHBOARD_RASA, GET_DASHBOARD_STATS } from './constants';

export const initialState = fromJS({
  stats: {},
  rasa: {
    online: true,
  },
});

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD_RASA:
      return state.set('rasa', action.data);
    case GET_DASHBOARD_STATS:
      return state.set('stats', action.data);

    default:
      return state;
  }
}

export default dashboardPageReducer;
