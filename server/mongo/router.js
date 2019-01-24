const express = require('express');
const router = express.Router();
const agents = require('./controllers/agents');
const add = require('./controllers/dialog/add');
const get = require('./controllers/dialog/get');
const move = require('./controllers/dialog/move');
const {
  createNodeWrapper,
  getNodeWrappers,
  updateNodeWrapper,
  deleteNodeWrapper,
} = require('./controllers/dialog/wrapper');

const intents = require('./controllers/intents');
const guard = require('../authentication/guard');
const training = require('./controllers/training');
const entities = require('./controllers/entities');
const smallTalk = require('./controllers/smallTalk');
const analytics = require('./controllers/analytics');
const update = require('./controllers/dialog/update');
const remove = require('./controllers/dialog/remove');
const parameters = require('./controllers/parameters');
const expressions = require('./controllers/expressions');
const { generateResponse } = require('./direct/generateResponse');
const permissions = require('./controllers/permissions/permissions');
const thirdParty = require('./controllers/thirdParty');

/** Dashboard */

router.get('/stats/', guard('dashboard:read'), analytics.getDashboard);
router.get('/stats/rasa', guard('dashboard:read'), analytics.getRasaStats);

/** Node Wrapper */

router.get('/node-wrapper', guard('talk:read'), getNodeWrappers);
router.post('/node-wrapper', guard('talk:write'), createNodeWrapper);
router.put(
  '/node-wrapper/:talkWrapper',
  guard('talk:write'),
  updateNodeWrapper,
);
router.post('/node-wrapper', guard('talk:write'), createNodeWrapper);
router.delete(
  '/node-wrapper/:talkWrapper',
  guard('talk:write'),
  deleteNodeWrapper,
);

/** Dialog */
router.get('/node-single/:talkWrapper/:uid', guard('talk:read'), get.getNode);
router.post(
  '/node-single/:talkWrapper/:uid',
  guard('talk:write'),
  update.update,
);

router.post('/node-add/:talkWrapper', guard('talk:write'), add);
router.post('/node-add/:talkWrapper/:target/', guard('talk:write'), add);
router.delete(
  '/node-remove/:talkWrapper/:target/',
  guard('talk:write'),
  remove,
);
router.post(
  '/node-move/:talkWrapper/:uid/:direction',
  guard('talk:write'),
  move,
);

router.get('/parents/:talkWrapper', guard('talk:read'), get.getParents);
router.post(
  '/node-toggle/:talkWrapper/:uid/',
  guard('talk:write'),
  update.toggle,
);
router.get(
  '/node-family/:talkWrapper/:uid',
  guard('talk:read'),
  get.getParentAndChildren,
);

/** small-talk * */
router.get('/smallTalk/:name', guard('smallTalk:read'), smallTalk.getST);
router.post('/smallTalk/:name', guard('smallTalk:write'), smallTalk.upsertST);

/** Agents* */
router.get('/agents', guard('agents:read'), agents.getAllAgents);
router.put('/agents', guard('agents:write'), agents.createAgentMongo);
router.post('/agents/:agent', guard('agents:write'), agents.renameAgent);
router.delete('/agents/:agent', guard('agents:write'), agents.removeAgentMongo);

/** Intents * */
router.get('/intents/:agent', guard('agents:read'), intents.getIntents);
router.post('/intents/:agent', guard('agents:write'), intents.addIntent);
router.post(
  '/intents/:agent/intent/:intentName',
  guard('agents:write'),
  intents.updateIntent,
);
router.post(
  '/delete/intent/:agent/',
  guard('agents:write'),
  intents.removeIntent,
);
router.patch(
  '/intents/:agent/intent/:intent',
  guard('agents:write'),
  intents.updateIntentName,
);

// /** Expressions * */
router.get(
  '/expression/:agent/intent/:intent',
  guard('agents:read'),
  expressions.getExpressions,
);
router.post(
  '/expression/:agent/intent/:intent/',
  guard('agents:write'),
  expressions.addExpressions,
);
router.post(
  '/delete/expressions/:agent/intent/:intent/',
  guard('agents:write'),
  expressions.removeExpressions,
);

/** Parameters * */
router.post(
  '/parameters/:agent/:intent/',
  guard('agents:write'),
  parameters.updateParameter,
);
router.delete(
  '/delete/parameters/:_id/:start/:end',
  guard('agents:write'),
  parameters.removeParameter,
);

/**
 * Permissions
 */

router.get('/permissions', guard('admin:read'), permissions.getPermissions);
router.post(
  '/permissions/roles',
  guard('admin:write'),
  permissions.updateRoles,
);
router.post(
  '/permissions/groups',
  guard('admin:write'),
  permissions.updateGroups,
);
router.post('/permissions/user', guard('admin:write'), permissions.updateUser);

/**
 * Training Data
 */

router.get(
  '/training/generate/:agent',
  guard('training:write'),
  training.generateJSON,
);
router.post('/training/json', guard('training:read'), training.getJSON);
router.get('/training/', guard('training:read'), training.getTraining);
router.post('/training/:agent', guard('training:write'), training.train);
router.post('/training/parse/:agent', guard('training:read'), training.parse);
router.get('/training/rasa/', guard('training:read'), training.status);

/**
 * Entities
 */

router.get('/entities', guard('entities:read'), entities.getEntities);
router.post('/entities', guard('entities:write'), entities.addEntitiy);
router.post('/delete/entities', guard('entities:write'), entities.deleteEntity);

/**
 * Synonyms
 */

router.get('/synonyms/:entity', guard('entities:read'), entities.getSynonyms);
router.post(
  '/variants/:entity',
  guard('entities:write'),
  entities.updateVariants,
);
router.post(
  '/synonyms/:entity/:synonym',
  guard('entities:write'),
  entities.addSynonym,
);
router.post(
  '/delete/synonyms/:entity',
  guard('entities:write'),
  entities.removeSynonyms,
);

/**
 * Generate Response
 */

router.post('/reply/:uid', generateResponse);

/**
 * Third Parties
 */

router.get(
  '/thirdParty',
  guard('thirdParty:readAPI'),
  thirdParty.getThirdParties,
);
router.post(
  '/thirdParty/facebook',
  guard('thirdParty:write'),
  thirdParty.updateFacebook,
);

router.post(
  '/thirdParty/telegram',
  guard('thirdParty:write'),
  thirdParty.updateTelegram,
);

module.exports = router;
