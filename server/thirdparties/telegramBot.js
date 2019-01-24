/* eslint-disable camelcase */
const TelegramBot = require('node-telegram-bot-api');
const {
  generateResponseInternal,
} = require('../mongo/direct/generateResponse');

global.bot = {};

const telegramBot = props => {
  const { token, project, talkWrapper, domain_name } = props;
  // Create a bot that uses 'polling' to fetch new updates
  global.bot = new TelegramBot(token, { project, talkWrapper });
  global.bot.setWebHook(`${domain_name}/bot/telegramAPI`);
  global.bot.on('message', msg => {
    const chatId = msg.chat.id;
    generateResponseInternal(
      msg.chat.id,
      msg.text,
      global.bot.options.project,
      null,
      global.bot.options.talkWrapper,
    ).then(replies => {
      replies.forEach(reply => {
        global.bot.sendMessage(chatId, reply.text);
      });
    });
  });
};

module.exports = telegramBot;
