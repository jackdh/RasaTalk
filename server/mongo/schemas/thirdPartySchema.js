const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const thirdPartySchema = new Schema({
  type: { type: String },
  client_id: { type: String },
  access_token: { type: String },
  verify_token: { type: String },
  client_secret: { type: String },
  agent: { type: String, required: true },
  debug: { type: Boolean, default: false },
  enabled: { type: Boolean, default: false },
  require_delivery: { type: Boolean, default: false },
  require_appsecret_proof: { type: Boolean, default: false },
});

// the schema is useless so far
// we need to create a model using it
const smallTalk = mongoose.model('third-parties', thirdPartySchema);

// make this available to our Nodes in our Node applications
module.exports = smallTalk;
