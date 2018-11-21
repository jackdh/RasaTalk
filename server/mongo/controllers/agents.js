/* eslint-disable no-param-reassign,no-useless-escape */
const agentSchema = require('../schemas/agentsSchema');
const expressionSchema = require('../schemas/expressionsSchema');
const debug = require('debug')('Agents');
const co = require('co');
const { validateAgent } = require('../utils/validators');
const {
  addPermission,
  addPermissionToUser,
  deletePermission,
} = require('./permissions/permissions');

function getAllAgents(req, res) {
  co(function* t() {
    const userPerms = res.locals.permissions.map(perm => {
      const pos = perm.lastIndexOf(':');
      return perm.substring(0, pos);
    });

    return yield agentSchema
      .find({ _id: { $in: userPerms } }, '-intents -__v')
      .lean()
      .exec();
  })
    .then(model => res.send(model))
    .catch(error => {
      debug(error);
      res.status(475).send(error.message);
    });
}

function removeAgentMongo(req, res) {
  debug('Removing Agent: %o', req.params.agent);
  co(function* t() {
    const model = yield agentSchema.findOne({ _id: req.params.agent });

    const intents = model.intents.map(i => i._id);

    yield expressionSchema.remove({ intent: { $in: intents } });

    yield deletePermission(req.params.agent);

    yield model.remove();
  })
    .then(() => res.status(275).send(`Removed: ${req.params.agent}`))
    .catch(e => {
      debug(e);
      res.status(475).send(e.message);
    });
}

function createAgentMongo(req, res) {
  const agent = req.body;
  debug('Creating Agent: %o', agent.agent);
  co(function* t() {
    agent._id = `ag-${agent.agent.replace(
      /[`~!@#$£ %^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      '',
    )}`;
    const model = yield agentSchema.findOne({ _id: agent._id });
    if (model) throw new Error('That agent already exists');
    yield validateAgent.validate(agent);
    yield agentSchema.create(agent);

    yield addPermission(agent._id);
    yield addPermissionToUser(agent._id, res.locals.user);
  })
    .then(() => {
      debug('Created Agent: %o', agent.agent);
      res.sendStatus(200);
    })
    .catch(error => {
      debug('Failed Creating Agent: %o, %O', agent.agent, error);
      res.status(475).send(error.message);
    });
}

function renameAgent(req, res) {
  debug('Renaming Agent: %o to %o', req.body.agent);
  co(function* t() {
    const model = yield agentSchema.findOne({ _id: req.body._id }, '-intents');
    model.agent = req.body.agent;
    model.avatar = req.body.avatar;
    model.title = req.body.title;
    model.subtitle = req.body.subtitle;
    model.description = req.body.description;
    yield model.save();
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
