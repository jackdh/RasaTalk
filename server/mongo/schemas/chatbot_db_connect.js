const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGOCONNECTIONSTRING);
module.exports = mongoose;
