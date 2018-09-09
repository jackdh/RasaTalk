const debug = require('debug')('botkit:onboarding');

module.exports = controller => {
  controller.on('onboard', bot => {
    debug('Starting an onboarding experience!');

    bot.startPrivateConversation(
      { user: bot.config.createdBy },
      (err, convo) => {
        if (err) {
          debug(err);
        } else {
          convo.say('I am a bot that has just joined your team');
          convo.say(
            'You must now /invite me to a channel so that I can be of use!',
          );
        }
      },
    );
  });
};
