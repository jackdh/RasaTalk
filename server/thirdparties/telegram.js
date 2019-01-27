/* eslint-disable camelcase */
const co = require('co');
const debug = require('debug')('Telegram');
const forOwn = require('lodash/forOwn');
const ThirdPartySchema = require('../mongo/schemas/thirdPartySchema');
const axios = require('axios');
const logger = require('../logger');
const x = require('../mongo/direct/generateResponse');
const gr = x.generateResponseInternal;

const turl = t => `https://api.telegram.org/bot${t}/`;

/**
 * This will extract the telegram details from the database and set the webhook.
 */
function updateTelegramWebhook() {
  return new Promise((resolve, reject) => {
    co(function* t() {
      const model = yield ThirdPartySchema.findOne({ type: 'telegram' })
        .lean()
        .exec();
      if (model && model.enabled) {
        const c = yield axios.get(
          `${turl(model.telegram_token)}getWebhookInfo`,
        );
        const currentWebhook = c.data.result.url;
        if (`${model.domain_name}/bot/telegramAPI` === currentWebhook) {
          logger.log(
            `Telegram Webhook already: ${model.domain_name}/bot/telegramAPI`,
          );
        } else {
          // Set webhook
          if (currentWebhook !== '') {
            yield axios.post(`${turl(model.telegram_token)}deleteWebhook`);
          }
          const d = yield axios.post(
            `${turl(model.telegram_token)}setWebhook`,
            {
              url: `${model.domain_name}/bot/telegramAPI`,
              allowed_updates: [],
            },
          );
          if (d.data.result) {
            logger.log(`Webhook set: ${model.domain_name}/bot/telegramAPI`);
          } else {
            logger.log(
              `Failed Webhook set: ${model.domain_name}/bot/telegramAPI`,
            );
          }
        }
      }
    })
      .then(() => {
        resolve();
      })
      .catch(error => {
        debug(error);
        reject(
          Error(
            "Telegram doesn't like your URL. Is it HTTPS and accessible? Check the debug logs for more",
          ),
        );
      });
  });
}

updateTelegramWebhook(); // Runs once on load.

/**
 * This handles the incoming telegram webhook.
 * @param webserver
 * @returns {*}
 */
function server(webserver) {
  return webserver.post(`/bot/telegramAPI`, (req, res) => {
    co(function* t() {
      const model = yield ThirdPartySchema.findOne({ type: 'telegram' })
        .lean()
        .exec();

      const { chat, from, text } = req.body.message;
      let userMessage = text;
      if (text.startsWith('/')) {
        const split = text.split(' ');
        split.shift();
        userMessage = split.join(' ');
      }

      const telegramDetails = {
        t_user_message: { value: userMessage },
      };
      forOwn(from, (value, key) => {
        telegramDetails[`t_${key}`] = { value };
      });

      const messages = yield gr(
        chat.id,
        text,
        model.agent,
        null,
        model.talkWrapper,
        telegramDetails,
      );

      for (let i = 0; i < messages.length; i += 1) {
        yield axios.post(`${turl(model.telegram_token)}sendMessage`, {
          chat_id: chat.id,
          text: messages[i].text,
          parse_mode: 'Markdown',
        });
      }
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(error => {
        debug(error);
      });
  });
}

module.exports = {
  server,
  updateTelegramWebhook,
};
