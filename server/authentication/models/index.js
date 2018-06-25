const mongoose = require('../../mongo/schemas/chatbot_db_connect');
const debug = require('debug')('models/index');

module.exports.connect = uri => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', err => {
    debug(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  // eslint-disable-next-line global-require
  require('./user');
};
