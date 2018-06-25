import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the entities state domain
 */
const selectEntitiesDomain = state => state.get('entities', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Entities
 */

const makeSelectEntities = () =>
  createSelector(selectEntitiesDomain, substate => substate.toJS());

export default makeSelectEntities;
export { selectEntitiesDomain };
