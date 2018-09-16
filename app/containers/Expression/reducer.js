/* eslint-disable no-underscore-dangle */
/*
 *
 * Expression reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  expressions: [],
  entities: [],
  loading: true,
  error: '',

  intentName: '',
  originalIntentName: '',
  updatingIntentName: false,
});

function expressionReducer(state = initialState, action) {
  switch (action.type) {
    case c.SET_INTENT_NAME:
      return state
        .set('intentName', action.name)
        .set('originalIntentName', action.name);
    case c.SAVING_UPDATED_INTENT_NAME:
      return state.set('updatingIntentName', action.toggle);
    case c.UPDATE_INTENT_NAME: {
      return state.set('intentName', action.name);
    }
    case c.ADD_EXPRESSION_SUCCESS: {
      const exp = action.expressions.map(expression => ({
        value: expression,
        entities: [],
      }));
      return state.update('expressions', expressions =>
        exp.concat(expressions),
      );
    }
    case c.GET_EXPRESSION_FAILURE:
      return state.set('error', action.error);
    case c.GET_EXPRESSION_SUCCESS:
      return state.set('expressions', action.expressions);
    case c.GETING_EXPRESSION:
      return state.set('loading', action.toggle);
    case c.REMOVE_EXPRESSION_SUCCESS: {
      const justExpressions = action.expressions.map(e => e.value);
      return state.update('expressions', expressions =>
        expressions.filter(
          expression => !justExpressions.includes(expression.value),
        ),
      );
    }
    case c.GET_ENTITIES_SUCCESS:
      return state.set('entities', action.entities);
    case c.ADD_PARAMETER_SUCCESS:
      return state.update('expressions', expressions => {
        expressions[
          expressions.findIndex(
            expression => expression._id === action.entity._id,
          )
        ].entities.push(action.entity);
        return expressions;
      });
    case c.REMOVE_PARAMETER_SUCCESS:
      return state.update('expressions', expressions => {
        const findIndex = expressions.findIndex(
          expression => expression._id === action.entity._id,
        );
        expressions[findIndex].entities.splice(
          expressions[findIndex].entities.findIndex(
            entity =>
              entity.start === action.entity.start &&
              entity.end === action.entity.end,
          ),
          1,
        );
        return expressions;
      });
    default:
      return state;
  }
}

export default expressionReducer;
