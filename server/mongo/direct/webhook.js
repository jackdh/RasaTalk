/* eslint-disable no-param-reassign */
const MessageSchema = require('../schemas/messageHistorySchema');
const moment = require('moment');
const axios = require('axios');
const _ = require('lodash');
const co = require('co');

const fireWebhook = (session, webhook) =>
  co(function* work() {
    const options = {
      method: webhook.type,
      url: includeDynamic(session, webhook.to),
    };

    if (webhook.body) options.data = yield updateBody(session, webhook.body);

    const { data } = yield axios(options);

    if (webhook.save) {
      webhook.variables.forEach(s => {
        if (_.has(data, s.path)) {
          session.entities.saved[s.as] = { value: _.get(data, s.path) };
        }
      });
    }
    return data;
  });

/**
 * Adds any session entities to the outgoing message.
 *
 * @param session
 * @param text
 * @returns {*}
 */
const includeDynamic = (session, text) => {
  if (session.entities) {
    if (session.entities.saved) {
      _.forEach(session.entities.saved, ({ value }, key) => {
        text = _.replace(text, new RegExp(key, 'g'), value);
      });
    }
  }
  return text;
};

/**
 * Added in date and message log to the body should it be present.
 * @param session
 * @param body
 * @returns {*}
 */
const updateBody = (session, body) =>
  co(function* u() {
    body = _.replace(body, '[date]', moment().format('LLLL'));
    if (body.indexOf('[message_log]') !== -1) {
      const rawLog = yield MessageSchema.findOne({ _id: session.sessionID })
        .lean()
        .exec();
      body = _.replace(body, '[message_log]', makeLog(rawLog.history));
    }

    body = includeDynamic(session, body);

    try {
      const b = JSON.parse(body);
      return b;
    } catch (e) {
      return body;
    }
  });

/**
 * Update this to make the log look prettier.
 * @param log
 * @returns {*}
 */
const makeLog = log => {
  let body = '';
  log.map(message => {
    if (_.eq(message.type, 'human')) {
      body = `${body}Human: ${message.text} <br><br>`;
    } else {
      body = `${body}Bot: ${message.text}<br><br>`;
    }
    return null;
  });
  return body;
};

module.exports = {
  fireWebhook,
};
