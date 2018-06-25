const mongoose = require('./chatbot_db_connect');

const Schema = mongoose.Schema;

const smallTalkSchema = new Schema(
  {
    name: { type: String, required: true },
    options: Schema.Types.Mixed,
  },
  { usePushEach: true },
);

// the schema is useless so far
// we need to create a model using it
const options = mongoose.model('options', smallTalkSchema);

// make this available to our Nodes in our Node applications
module.exports = options;
