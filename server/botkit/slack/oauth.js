/* eslint-disable no-param-reassign,consistent-return */
const debug = require('debug')('botkit:oauth');

const ThirdPartySchema = require('../../mongo/schemas/thirdPartySchema');

const getPageToken = () =>
  new Promise((resolve, reject) => {
    ThirdPartySchema.findOne({ type: 'slack' })
      .lean()
      .exec()
      .then(model => {
        if (model.enabled) {
          resolve({
            clientId: model.client_id,
            clientSecret: model.client_secret,
          });
        } else {
          reject();
        }
      });
  });

module.exports = (webserver, controller) => {
  const handler = {
    slacklogin(req, res) {
      getPageToken().then(({ clientId, clientSecret }) => {
        controller.config.clientId = clientId;
        controller.config.clientSecret = clientSecret;
        res.redirect(controller.getAuthorizeURL());
      });
    },
    slackoauth(req, res) {
      const { code } = req.query;

      // we need to use the Slack API, so spawn a generic bot with no token
      const slackapi = controller.spawn({});

      const opts = {
        client_id: controller.config.clientId,
        client_secret: controller.config.clientSecret,
        code,
      };

      slackapi.api.oauth.access(opts, (err, auth) => {
        if (err) {
          debug('Error confirming oauth', err);
          return res.redirect('/login_error.html');
        }

        // use the token we got from the oauth
        // to call auth.test to make sure the token is valid
        // but also so that we reliably have the team_id field!
        slackapi.api.auth.test(
          { token: auth.access_token },
          (slackErr, identity) => {
            if (slackErr) {
              debug('Error fetching user identity', slackErr);
              return res.redirect('/login_error.html');
            }

            // Now we've got all we need to connect to this user's team
            // spin up a bot instance, and start being useful!
            // We just need to make sure this information is stored somewhere
            // and handled with care!

            // In order to do this in the most flexible way, we fire
            // a botkit event here with the payload so it can be handled
            // by the developer without meddling with the actual oauth route.

            auth.identity = identity;
            controller.trigger('oauth:success', [auth]);

            res.cookie('team_id', auth.team_id);
            res.cookie('bot_user_id', auth.bot.bot_user_id);
            res.redirect('/thirdParty');
          },
        );
      });
    },
  };

  // Create a /login link
  // This link will send user's off to Slack to authorize the app
  // See: https://github.com/howdyai/botkit/blob/master/readme-slack.md#custom-auth-flows
  debug('Configured /slacklogin url');
  webserver.get('/slacklogin', handler.slacklogin);

  // Create a /oauth link
  // This is the link that receives the postback from Slack's oauth system
  // So in Slack's config, under oauth redirect urls,
  // your value should be https://<my custom domain or IP>/oauth
  debug('Configured /slackoauth url');
  webserver.get('/slackoauth', handler.slackoauth);

  return handler;
};
