/* eslint-disable no-param-reassign */
const debug = require('debug')('botkit:user_registration');

module.exports = controller => {
  /* Handle event caused by a user logging in with oauth */
  controller.on('oauth:success', payload => {
    debug('Got a successful login!', payload);
    if (!payload.identity.team_id) {
      debug('Error: received an oauth response without a team id', payload);
    }
    controller.storage.teams.get(payload.identity.team_id, (err, team) => {
      if (err) {
        debug(
          'Error: could not load team from storage system:',
          payload.identity.team_id,
          err,
        );
      }

      let newTeam = false;
      if (!team) {
        team = {
          id: payload.identity.team_id,
          createdBy: payload.identity.user_id,
          url: payload.identity.url,
          name: payload.identity.team,
        };
        newTeam = true;
      }

      team.bot = {
        token: payload.bot.bot_access_token,
        user_id: payload.bot.bot_user_id,
        createdBy: payload.identity.user_id,
        app_token: payload.access_token,
      };

      const testbot = controller.spawn(team.bot);

      testbot.api.auth.test({}, (testErr, botAuth) => {
        if (testErr) {
          debug('Error: could not authenticate bot user', testErr);
        } else {
          team.bot.name = botAuth.user;

          // add in info that is expected by Botkit
          testbot.identity = botAuth;

          testbot.identity.id = botAuth.user_id;
          testbot.identity.name = botAuth.user;

          testbot.team_info = team;

          // Replace this with your own database!
          // Need to save it in our database or let them hook up to mongo
          controller.storage.teams.save(team, saveErr => {
            if (saveErr) {
              debug('Error: could not save team record:', saveErr);
            } else if (newTeam) {
              controller.trigger('create_team', [testbot, team]);
            } else {
              controller.trigger('update_team', [testbot, team]);
            }
          });
        }
      });
    });
  });

  controller.on('create_team', (bot, team) => {
    debug('Team created:', team);

    // Trigger an event that will establish an RTM connection for this bot
    controller.trigger('rtm:start', [bot.config]);

    // Trigger an event that will cause this team to receive onboarding messages
    controller.trigger('onboard', [bot, team]);
  });

  controller.on('update_team', (bot, team) => {
    debug('Team updated:', team);
    // Trigger an event that will establish an RTM connection for this bot
    controller.trigger('rtm:start', [bot]);
  });
};
