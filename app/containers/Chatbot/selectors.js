import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chatbot state domain
 */
const selectChatbotDomain = state => state.get('chatbot', initialState);

/**
 * Other specific selectors
 */

const selectInput = () =>
  createSelector(selectChatbotDomain, state => ({
    input: state.get('input'),
    uuid: state.get('uuid'),
  }));

/**
 * Default selector used by Chatbot
 */

const makeSelectChatbot = () =>
  createSelector(selectChatbotDomain, substate => substate.toJS());

export default makeSelectChatbot;
export { selectChatbotDomain, selectInput };
