import { createSelector } from 'reselect';
import find from 'lodash/find';
import { initialState } from './reducer';

/**
 * Direct selector to the agents state domain
 */
const selectAgentsDomain = state => state.get('agents', initialState);

/**
 * Other specific selectors
 */

const selectAgent = agent =>
  createSelector(selectAgentsDomain, s => {
    const toRet = find(s.get('agents'), { _id: agent });
    return toRet;
  });

const selectOldName = () =>
  createSelector(selectAgentsDomain, subState => subState.get('oldNode'));

/**
 * Default selector used by Agents
 */

const makeSelectAgents = () =>
  createSelector(selectAgentsDomain, substate => substate.toJS());

export default makeSelectAgents;
export { selectAgentsDomain, selectOldName, selectAgent };
