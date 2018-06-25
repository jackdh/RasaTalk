/* eslint consistent-return:0 */
require('dotenv').config();
const debug = require('debug')('Server/index');
const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');

if (
  !process.env.PORT ||
  !process.env.RASASERVER ||
  !process.env.JWTSECRET ||
  !process.env.MONGOCONNECTIONSTRING
) {
  logger.error('Please check environment file.');
  if (!process.env.PORT) logger.error('No port specified');
  if (!process.env.RASASERVER) logger.error('No Rasa ip specified');
  if (!process.env.JWTSECRET) logger.error('No JWT Secret specified');
  if (!process.env.MONGOCONNECTIONSTRING) logger.error('No Mongo specified');
  debug('Please update the .env file');
}

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;

// const ngrok = false;

const { resolve } = require('path');
const app = express();
const passport = require('passport');
const isAuth = require('./authentication/isAuthenticated');

app.use(
  bodyParser.urlencoded({
    parameterLimit: 10000,
    limit: '2mb',
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(passport.initialize());

const localSignupStrategy = require('./authentication/local-signup');
const localLoginStrategy = require('./authentication/local-signin');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
const authRoute = require('./authentication/auth-router');

app.use('/auth', authRoute);
app.use('/api', isAuth, require('./mongo/router'));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
