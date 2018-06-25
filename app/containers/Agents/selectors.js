import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the agents state domain
 */
const selectAgentsDomain = state => state.get('agents', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Agents
 */

const makeSelectAgents = () =>
  createSelector(selectAgentsDomain, substate => substate.toJS());

export default makeSelectAgents;
export { selectAgentsDomain };
