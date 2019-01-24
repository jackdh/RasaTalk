/* eslint-disable camelcase */
const co = require('co');
const ThirdPartySchema = require('../mongo/schemas/thirdPartySchema');
const telegramBot = require('./telegramBot');

co(function* t() {
  yield ThirdPartySchema.findOne({ type: 'telegram' })
    .lean()
    .exec()
    .then(model => {
      telegramBot({
        domain_name: model.domain_name,
        enabled: model.enabled,
        token: model.telegram_token,
        project: model.agent,
        talkWrapper: model.talkWrapper,
      });
    });
});

// module.exports = telegramBot;

module.exports = webserver => {
  webserver.post(`/bot/telegramAPI`, (req, res) => {
    ThirdPartySchema.findOne({ type: 'telegram' })
      .lean()
      .exec()
      .then(model => {
        if (model.enabled) {
          global.bot.processUpdate(req.body);
        }
        res.sendStatus(200);
      });
  });
};
