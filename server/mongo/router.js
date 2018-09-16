const express = require('express');
const router = express.Router();
const agents = require('./controllers/agents');
const add = require('./controllers/dialog/add');
const get = require('./controllers/dialog/get');
const intents = require('./controllers/intents');
const guard = require('../authentication/guard');
const move = require('./controllers/dialog/move');
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

/** Dialog */
router.get('/node-single/:uid', guard('talk:read'), get.getNode);
router.post('/node-single/:uid', guard('talk:write'), update.update);

router.post('/node-add/', guard('talk:write'), add);
router.post('/node-add/:target/', guard('talk:write'), add);
router.delete('/node-remove/:target/', guard('talk:write'), remove);
router.post('/node-move/:uid/:direction', guard('talk:write'), move);

router.get('/parents', guard('talk:read'), get.getParents);
router.post('/node-toggle/:uid/', guard('talk:write'), update.toggle);
router.get('/node-family/:uid', guard('talk:read'), get.getParentAndChildren);

/** small-talk * */
router.get('/smallTalk/:name', guard('smallTalk:read'), smallTalk.getST);
router.post('/smallTalk/:name', guard('smallTalk:write'), smallTalk.upsertST);

/** Agents* */
router.get('/agents', guard('agents:read'), agents.getAllAgents);
router.put('/agents', guard('agents:write'), agents.createAgentMongo);
router.post('/agents', guard('agents:write'), agents.renameAgent);
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
  '/delete/:agent/intent/',
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
  '/delete/:agent/intent/:intent/expressions',
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
router.post('/training/', guard('training:write'), training.train);
router.get('/training/rasa/', guard('training:read'), training.status);
router.post('/training/parse/', guard('training:read'), training.parse);

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

router.get('/thirdParty', guard('thirdParty:read'), thirdParty.getThirdParties);
router.post(
  '/thirdParty/facebook',
  guard('thirdParty:write'),
  thirdParty.updateFacebook,
);

module.exports = router;
