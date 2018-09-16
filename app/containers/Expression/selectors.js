import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the expression state domain
 */
const selectExpressionDomain = state => state.get('expression', initialState);

/**
 * Other specific selectors
 */

const selectEntities = () =>
  createSelector(selectExpressionDomain, substate => {
    const x = substate.toJS();
    return x.entities;
  });

const selectIntent = () =>
  createSelector(selectExpressionDomain, s => s.get('intentName'));

const selectOriginal = () =>
  createSelector(selectExpressionDomain, s => s.get('originalIntentName'));

/**
 * Default selector used by Expression
 */

const makeSelectExpression = () =>
  createSelector(selectExpressionDomain, substate => substate.toJS());

export default makeSelectExpression;
export { selectExpressionDomain, selectEntities, selectIntent, selectOriginal };
