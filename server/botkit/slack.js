/* eslint-disable global-require */
const {
  generateResponseInternal,
} = require('../mongo/direct/generateResponse');
const ThirdPartySchema = require('../mongo/schemas/thirdPartySchema');

module.exports = (webserver, controller) => {
  require('./slack/user_regisration')(controller);
  require('./slack/rtm')(controller);
  require('./slack/oauth')(webserver, controller);

  webserver.post('/slack/receive', (req, res) => {
    controller.handleWebhookPayload(req, res);
  });

  // TODO: Fix this!!!
  controller.hears(
    '.*',
    'direct_message,direct_mention,mention',
    (bot, message) => {
      bot.startConversation(message, (err, convo) => {
        ThirdPartySchema.findOne({ type: 'slack' })
          .lean()
          .exec()
          .then(model => {
            generateResponseInternal(
              message.user,
              message.text,
              model.agent,
            ).then(replies => {
              replies.forEach(reply => {
                convo.ask(reply);
              });
              convo.next();
            });
          });
      });
    },
  );
};
