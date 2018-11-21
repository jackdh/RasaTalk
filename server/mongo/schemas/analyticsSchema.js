const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const analyticsSchema = new Schema({
  agent: String,
  talkWrapper: String,
  query: String,
  intent: String,
  responseTime: Number,
  session: String,
  cache: Boolean,
});

const intent = mongoose.model('analytics', analyticsSchema);

module.exports = intent;
