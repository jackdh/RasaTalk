const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const nodeWrappers = new Schema({
  name: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
const entities = mongoose.model('nodeWrappers', nodeWrappers);

// make this available to our Nodes in our Node applications
module.exports = entities;
