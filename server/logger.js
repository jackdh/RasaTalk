/* eslint-disable no-console */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

let mongoC = 'X';
/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: err => {
    console.error(chalk.red(err));
  },

  log: msg => {
    console.log(msg);
  },

  mongo: err => {
    if (err) {
      mongoC = chalk.red('CONNECTION FAILED');
      if (err.message === 'Authentication failed.') {
        console.log(
          chalk.red(
            'MongoDB connection authentication failed. Please check login details.',
          ),
        );
      } else {
        console.log(
          chalk.red(
            `MongoDB connection FAILED. It is required to register / login error: ${
              err.message
            }`,
          ),
        );
      }
    } else {
      mongoC = chalk.green('✓');
    }
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host, tunnelStarted, https = false) => {
    console.log(`Server started ! ${chalk.green('✓')}`);
    if (https) {
      console.log(`HTTPS enabled ! ${chalk.green('✓')}`);
    }

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
      Mongo: ${process.env.MONGOCONNECTIONSTRING} ${mongoC}
      Rasa: ${process.env.RASASERVER}
      Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted
          ? `\n      Proxy: ${chalk.magenta(tunnelStarted)}`
          : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
