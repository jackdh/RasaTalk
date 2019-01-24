/* eslint-disable camelcase */
const co = require('co');
const ThirdPartySchema = require('../mongo/schemas/thirdPartySchema');
const telegramBot = require('./telegramBot');
// replace the value below with the Telegram token you receive from @BotFather

// So I'm trying to figure out how to get this telegram thing to work.
// we can use a webhook but then the problem is updating the bot on the fly. Namly the Webhook URL without a restart.
/**
 *  Maybe we can put the telegramBot set thing as a internal proptery which uses this. to then update the items. I'm signing off goodluck
 */

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
