const mongoose = require('./chatbot_db_connect');

const Schema = mongoose.Schema;

const synonymsSchema = new Schema(
  {
    entity: { type: String, ref: 'intents' },
    synonym_reference: { type: String, required: true },
    list: [
      {
        type: String,
      },
    ],
  },
  { usePushEach: true },
);

// the schema is useless so far
// we need to create a model using it
const intent = mongoose.model('synonyms', synonymsSchema);

// make this available to our Nodes in our Node applications
module.exports = intent;
