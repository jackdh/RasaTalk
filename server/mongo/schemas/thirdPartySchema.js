const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const thirdPartySchema = new Schema({
  type: { type: String },
  enabled: { type: Boolean, default: false },
  debug: { type: Boolean, default: false },
  access_token: { type: String },
  verify_token: { type: String },
  require_appsecret_proof: { type: Boolean, default: false },
  require_delivery: { type: Boolean, default: false },
  agent: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
const smallTalk = mongoose.model('third-parties', thirdPartySchema);

// make this available to our Nodes in our Node applications
module.exports = smallTalk;
