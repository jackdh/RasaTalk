const debug = require('debug')('botkit:rtm_manager');

module.exports = controller => {
  const managedBots = {};

  // Capture the rtm:start event and actually start the RTM...
  controller.on('rtm:start', config => {
    const bot = controller.spawn(config);
    manager.start(bot);
  });

  //
  controller.on('rtm_close', bot => {
    manager.remove(bot);
  });

  // The manager object exposes some useful tools for managing the RTM
  let manager = {
    start(bot) {
      if (managedBots[bot.config.token]) {
        debug('Start RTM: already online');
      } else {
        bot.startRTM((err, b) => {
          if (err) {
            debug('Error starting RTM:', err);
          } else {
            managedBots[b.config.token] = b.rtm;
            debug('Start RTM: Success');
          }
        });
      }
    },
    stop(bot) {
      if (managedBots[bot.config.token]) {
        if (managedBots[bot.config.token].rtm) {
          debug('Stop RTM: Stopping bot');
          managedBots[bot.config.token].closeRTM();
        }
      }
    },
    remove(bot) {
      debug('Removing bot from manager');
      delete managedBots[bot.config.token];
    },
    reconnect() {
      debug('Reconnecting all existing bots...');
      controller.storage.teams.all((err, list) => {
        if (err) {
          throw new Error('Error: Could not load existing bots:', err);
        } else {
          for (let l = 0; l < list.length; l += 1) {
            manager.start(controller.spawn(list[l].bot));
          }
        }
      });
    },
  };

  return manager;
};
