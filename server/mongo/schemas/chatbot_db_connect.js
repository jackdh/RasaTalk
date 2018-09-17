const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const logger = require('./../../logger');
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};

if (process.env.MONGOUSER && process.env.MONGOPASS) {
  options.auth = {
    user: encodeURIComponent(process.env.MONGOUSER),
    password: encodeURIComponent(process.env.MONGOPASS),
  };
}
mongoose.connect(
  process.env.MONGOCONNECTIONSTRING,
  options,
  err => {
    logger.mongo(err);
  },
);
logger.log(`Mongo connection: ${mongoose.connection.readyState}`);
module.exports = mongoose;
