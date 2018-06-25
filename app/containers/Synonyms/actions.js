/*
 *
 * Synonyms actions
 *
 */

import * as c from './constants';

export const getSynonyms = entity => ({ type: c.GET_SYNONYMS, entity });
export const gettingSynonyms = toggle => ({ type: c.GETTING_SYNONYMS, toggle });
export const getSynonymsSuccess = synonyms => ({
  type: c.GET_SYNONYMS_SUCCESS,
  synonyms,
});
export const getSynonymsFailure = error => ({
  type: c.GET_SYNONYMS_FAILURE,
  error,
});

export const updateVariants = (entity, synonym, variants) => ({
  type: c.UPDATE_VARIANTS,
  entity,
  synonym,
  variants,
});
export const updatingVariants = toggle => ({
  type: c.UPDATING_VARIANTS,
  toggle,
});
export const updateVariantsSuccess = toggle => ({
  type: c.UPDATE_VARIANTS_SUCCESS,
  toggle,
});
export const updateVariantsFailure = error => ({
  type: c.UPDATE_VARIANTS_FAILURE,
  error,
});

export const addSynonyms = (entity, synonym, resolve) => ({
  type: c.ADD_SYNONYMS,
  entity,
  synonym,
  resolve,
});
export const addingSynonyms = toggle => ({ type: c.ADDING_SYNONYMS, toggle });
export const addSynonymsSuccess = synonym => ({
  type: c.ADD_SYNONYMS_SUCCESS,
  synonym,
});
export const addSynonymsFailure = error => ({
  type: c.ADD_SYNONYMS_FAILURE,
  error,
});

export const removeSynonyms = (entity, synonyms) => ({
  type: c.REMOVE_SYNONYMS,
  entity,
  synonyms,
});
export const removingSynonyms = toggle => ({
  type: c.REMOVING_SYNONYMS,
  toggle,
});
export const removeSynonymsSuccess = synonyms => ({
  type: c.REMOVE_SYNONYMS_SUCCESS,
  synonyms,
});
export const removeSynonymsFailure = error => ({
  type: c.REMOVE_SYNONYMS_FAILURE,
  error,
});
