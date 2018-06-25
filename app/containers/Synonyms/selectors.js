import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the synonyms state domain
 */
const selectSynonymsDomain = state => state.get('synonyms', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Synonyms
 */

const makeSelectSynonyms = () =>
  createSelector(selectSynonymsDomain, substate => substate.toJS());

export default makeSelectSynonyms;
export { selectSynonymsDomain };
