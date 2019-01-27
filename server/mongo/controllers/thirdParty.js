const ThirdPartySchema = require('../schemas/thirdPartySchema');
const debug = require('debug')('ThirdParty');
const co = require('co');
const yup = require('yup');
const telegram = require('../../thirdparties/telegram');
const telegramSchema = yup.object().shape({
  telegram_token: yup.string().required(),
  agent: yup.string().required(),
  talkWrapper: yup.string().required(),
});

function getThirdParties(req, res) {
  ThirdPartySchema.find({})
    .lean()
    .exec()
    .then(model => {
      res.send(model);
    });
}

function updateFacebook(req, res) {
  debug('Updating facebook %O', req.body);
  req.body.type = 'facebook';
  ThirdPartySchema.update({ type: 'facebook' }, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
  })
    .then(() => {
      res.status(275).send('Facebook updated!');
    })
    .catch(error => {
      res.status(457).send(error.message);
    });
}

function updateTelegram(req, res) {
  co(function* t() {
    yield telegramSchema.validate(req.body);

    yield ThirdPartySchema.update({ type: 'telegram' }, req.body, {
      upsert: true,
      setDefaultsOnInsert: true,
    });

    yield ThirdPartySchema.findOne({ type: 'telegram' })
      .lean()
      .exec();

    yield telegram.updateTelegramWebhook();
  })
    .then(() => {
      res.status(275).send('Telegram updated!');
    })
    .catch(error => {
      ThirdPartySchema.update({ type: 'telegram' }, { enabled: false }).then(
        () => {
          res.status(475).send(error.message);
        },
      );
    });
}

module.exports = {
  getThirdParties,
  updateFacebook,
  updateTelegram,
};
