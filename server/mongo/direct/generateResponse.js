const co = require('co');
const uuidv1 = require('uuid/v1');
const get = require('../controllers/dialog/get');
const TraverseNodes = require('./traverseNodes');
const Session = require('../controllers/session');
const debug = require('debug')('GenerateResponse:');
const History = require('../controllers/message_history');
const { parseInteral } = require('../controllers/training');

/**
 * It will use co as a generator to go off and concurrently add the message to
 * the users history, get the dialog flow for this agent, parse the request
 * against the NLU engine and finally get the users session or create
 * it if it does not exist
 *
 * @param uid - The unique ID for this conversation
 * @param message - the humans message
 * @param project - Which agent should we target.
 * @param model - Which model within the agent should we target.
 */
function generateResponseInternal(uid, message, project, model) {
  return new Promise(resolve =>
    co(function* t() {
      try {
        // eslint-disable-next-line no-unused-vars
        const [history, flow, { data }, session] = yield [
          History.addToHistory(uid, { type: 'human', message }),
          get.flow(),
          parseInteral({ project, q: message, model }),
          Session.getSessionInternal(uid),
        ];

        data.ruid = uuidv1();

        const traverseNodes = new TraverseNodes(flow, data, session, {});

        yield traverseNodes.start();

        const replies = traverseNodes.getReplies();

        yield [session.save(), History.addToHistoryBot(uid, replies)];

        resolve(replies);
      } catch (error) {
        debug(error);
        resolve([{ type: 'bot', text: 'Sorry something went wrong' }]);
      }
    }),
  );
}

/**
 * This is a simple wrapper function for the above generate response. It exposes the main generate response method to API calls.
 */
function generateResponse(req, res) {
  const { uid } = req.params;
  const { message, project, model } = req.body;
  generateResponseInternal(uid, message, project, model).then(replies => {
    res.send(replies);
  });
}

module.exports = {
  generateResponseInternal,
  generateResponse,
};
