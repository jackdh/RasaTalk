/* eslint-disable no-underscore-dangle */
const IntentSchema = require('../schemas/agentsSchema');
const ExpressionSchema = require('../schemas/expressionsSchema');
const _ = require('lodash');
const debug = require('debug')('Expressions.js');

const getExpressions = (req, res) => {
  const { agent, intent } = req.params;

  IntentSchema.findOne({ _id: agent, 'intents.name': intent })
    .lean()
    .exec()
    .then(model => {
      const intentObj = _.find(model.intents, { name: intent });
      ExpressionSchema.find({ intent: intentObj._id }).then(expressions => {
        res.send(expressions);
      });
    })
    .catch(err => {
      debug(err);
      res
        .status(475)
        .send('Something went wrong on the backend. Please check the logs');
    });
};

const addExpressions = (req, res) => {
  const { agent, intent } = req.params;
  const { expressions } = req.body;

  if (!expressions || expressions === '') {
    res.sendStatus(500);
    return;
  }

  IntentSchema.findOne({ _id: agent, 'intents.name': intent })
    .then(iIntent => {
      const intentObj = _.find(iIntent.intents, { name: intent });
      const newExpressions = expressions.map(o => ({
        value: o,
        intent: intentObj._id,
      }));
      return ExpressionSchema.insertMany(newExpressions).then(() => {
        res.send(200);
      });
    })
    .catch(error => {
      debug(error);
      res
        .status(475)
        .send('Something went wrong on the backend. Please check the logs');
    });
};

const removeExpressions = (req, res) => {
  const expressions = req.body;

  // eslint-disable-next-line no-underscore-dangle
  const removeList = expressions.map(expression => expression._id);
  return ExpressionSchema.remove({ _id: { $in: removeList } })
    .then(() => {
      res
        .status(275)
        .send(
          `Removed ${expressions
            .map(expression => expression.value)
            .join(', ')}`,
        );
      return null;
    })
    .catch(error => {
      debug('Failed removing, %O', error);
      res
        .status(475)
        .send('Something went wrong on the backend. Please check the logs');
      return null;
    });
};

module.exports = {
  addExpressions,
  removeExpressions,
  getExpressions,
};
