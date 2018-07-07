/* eslint-disable no-param-reassign */
const IntentSchema = require('../schemas/intentsSchema');
const debug = require('debug')('Agents');

function getAllAgents(req, res) {
  debug('Get All Agents');
  IntentSchema.find({}, '-_id -intents -__v')
    .lean()
    .exec((err, model) => {
      if (err) {
        debug(err);
        res
          .status(475)
          .send('Something went wrong on the backend. Please check the logs');
      } else {
        res.send(model);
      }
    });
}

function removeAgentMongo(req, res) {
  debug('Removing Agent: %o', req.params.agent);
  IntentSchema.find({ agent: req.params.agent })
    .remove()
    .exec(err => {
      if (err) {
        debug('Failed to remove Agent: %o', req.params.agent);
        res
          .status(475)
          .send('Something went wrong on the backend. Please check the logs');
      } else {
        debug('Removed agent: %o', req.params.agent);
        res.status(275).send(`Removed: ${req.params.agent}`);
      }
    });
}

function createAgentMongo(req, res) {
  debug('Creating Agent: %o', req.body.agent);
  IntentSchema.create(req.body)
    .then(() => {
      debug('Created Agent: %o', req.body.agent);
      res.sendStatus(200);
    })
    .catch(error => {
      debug('Failed Creating Agent: %o, %O', req.body.agent, error);
      res
        .status(475)
        .send('Something went wrong on the backend. Please check the logs');
    });
}

function renameAgent(req, res) {
  debug('Renaming Agent: %o to %o', req.body.oldNode, req.body.agent);

  // IntentSchema.update({ agent: req.body.oldName });

  return IntentSchema.findOne({ agent: req.body.oldNode }, '-intents')
    .then(model => {
      debug('Found Agent');
      model.agent = req.body.agent;
      model.avatar = req.body.avatar;
      model.title = req.body.title;
      model.subtitle = req.body.subtitle;
      model.description = req.body.description;
      debug('Renamed Agent');
      return model.save();
    })
    .then(() => {
      debug('Sending Agent');
      res.status(275).send('Agent Updated');
    })
    .catch(() => {
      res.status(475).send('Failed updating the agent. Please check the logs');
    });
}

module.exports = {
  getAllAgents,
  removeAgentMongo,
  createAgentMongo,
  renameAgent,
};
