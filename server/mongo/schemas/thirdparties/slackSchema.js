const mongoose = require('../chatbot_db_connect');

const { Schema } = mongoose;

const slackSchema = new Schema({}, { strict: false });

// the schema is useless so far
// we need to create a model using it
const slackS = mongoose.model('slackTeams', slackSchema);

// make this available to our Nodes in our Node applications
module.exports = slackS;
