const {
  generateResponseInternal,
} = require('../mongo/direct/generateResponse');
const ThirdPartySchema = require('../mongo/schemas/thirdPartySchema');

const getVerfiy = () =>
  new Promise((resolve, reject) => {
    ThirdPartySchema.findOne({ type: 'facebook' }).then(model => {
      if (model.enabled) {
        resolve(model.verify_token);
      } else {
        reject();
      }
    });
  });

const getPageToken = () =>
  new Promise((resolve, reject) => {
    ThirdPartySchema.findOne({ type: 'facebook' })
      .lean()
      .exec()
      .then(model => {
        if (model.enabled) {
          resolve({
            accessToken: model.access_token,
            agent: model.agent,
            talkWrapper: model.talkWrapper,
          });
        } else {
          reject();
        }
      });
  });

module.exports = (webserver, controller) => {
  // Receive post data from fb, this will be the messages you receive
  webserver.post('/facebook/receive', (req, res) => {
    getPageToken().then(({ accessToken, agent, talkWrapper }) => {
      // respond to FB that the webhook has been received.
      res.status(200);
      res.send('ok');
      // Now, pass the webhook into be processed
      const bot = controller.spawn({});
      bot.botkit.config.access_token = accessToken;
      bot.botkit.config.agent = agent;
      bot.botkit.config.talkWrapper = talkWrapper;
      controller.handleWebhookPayload(req, res, bot);
    });
  });

  // Perform the FB webhook verification handshake with your verify token
  webserver.get('/facebook/receive', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe') {
      getVerfiy().then(verify => {
        if (req.query['hub.verify_token'] === verify) {
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
        message.message.text,
        bot.botkit.config.agent,
        bot.botkit.config.talkWrapper,
      ).then(replies => {
        replies.forEach(reply => {
          convo.ask(reply);
        });
        convo.next();
      });
    });
  });
};
