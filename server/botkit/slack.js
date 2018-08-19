const {
  generateResponseInternal,
} = require('../mongo/direct/generateResponse');
const ThirdPartySchema = require('../mongo/schemas/thirdPartySchema');

const getClientId = () =>
  new Promise((resolve, reject) => {
    ThirdPartySchema.findOne({ type: 'slack' }).then(model => {
      if (model.enabled) {
        resolve(model.client_id);
      } else {
        reject();
      }
    });
  });

const getPageToken = () =>
  new Promise((resolve, reject) => {
    ThirdPartySchema.findOne({ type: 'slack' })
      .lean()
      .exec()
      .then(model => {
        if (model.enabled) {
          resolve({ clientSecret: model.client_secret, agent: model.agent });
        } else {
          reject();
        }
      });
  });

module.exports = (webserver, controller) => {
  webserver.post('/slack/receive', (req, res) => {
    getPageToken().then(({ clientSecret, agent }) => {
      res.status(200);
      res.send('ok');
      const bot = controller.spawn({});
      bot.botkit.config.client_secret = clientSecret;
      bot.botkit.config.agent = agent;
      controller.handleWebhookPayload(req, res, bot);
    });
  });

  webserver.get('/slack/receive', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe') {
      getClientId().then(clientId => {
        if (req.query['hub.client_id'] === clientId) {
          res.send(req.query['hub.challenge']);
        } else {
          res.send('OK');
        }
      });
    }
  });

  controller.hears('.*', 'message_received', (bot, message) => {
    // do something!
    bot.startConversation(message, (err, convo) => {
      generateResponseInternal(
        message.user,
        // TODO: why are there two messages (message.message.text) in the facebook one?
        message.text,
        bot.botkit.config.agent,
      ).then(replies => {
        replies.forEach(reply => {
          convo.ask(reply);
        });
        convo.next();
      });
    });
  });
};
