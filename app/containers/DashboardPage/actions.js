/*
 *
 * DashboardPage actions
 *
 */

import * as c from './constants';

export const getDashboard = () => ({ type: c.GET_DASHBOARD });
export const gettingDashboard = toggle => ({
  type: c.GETTING_DASHBOARD,
  toggle,
});
export const getDashboardStats = data => ({
  type: c.GET_DASHBOARD_STATS,
  data,
});
export const getDashboardRasa = data => ({ type: c.GET_DASHBOARD_RASA, data });
export const getDashboardFailure = error => ({
  type: c.GET_DASHBOARD_FAILURE,
  error,
});
