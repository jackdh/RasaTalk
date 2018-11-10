const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const permSchema = new Schema({
  _id: String,
  type: String,
  name: String,
  permissions: [String],
});

const session = mongoose.model('permissions', permSchema);

// make this available to our Nodes in our Node applications
module.exports = session;
