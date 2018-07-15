const {
  generateResponseInternal,
} = require('../mongo/direct/generateResponse');

module.exports = (webserver, controller) => {
  // Receive post data from fb, this will be the messages you receive
  webserver.post('/facebook/receive', (req, res) => {
    // respond to FB that the webhook has been received.
    res.status(200);
    res.send('ok');

    const bot = controller.spawn({});

    // Now, pass the webhook into be processed
    controller.handleWebhookPayload(req, res, bot);
  });
  // Perform the FB webhook verification handshake with your verify token
  webserver.get('/facebook/receive', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe') {
      if (req.query['hub.verify_token'] === controller.config.verify_token) {
        res.send(req.query['hub.challenge']);
      } else {
        res.send('OK');
      }
    }
  });

  controller.hears('.*', 'message_received', (bot, message) => {
    // do something!
    bot.startConversation(message, (err, convo) => {
      generateResponseInternal(
        message.user,
        message.message.text,
        'Pizza',
      ).then(replies => {
        replies.forEach(reply => {
          convo.ask(reply);
        });
        convo.next();
      });
    });
  });
};
