const mongoose = require('./chatbot_db_connect');

const Schema = mongoose.Schema;

const expressionSchema = new Schema(
  {
    value: { type: String, required: true },
    intent: { type: Schema.Types.ObjectId, ref: 'intents' },
    entities: [
      {
        start: { type: Number, required: true },
        end: { type: Number, required: true },
        value: { type: String, required: true },
        entity: { type: String },
      },
    ],
  },
  { usePushEach: true },
);

// the schema is useless so far
// we need to create a model using it
const intent = mongoose.model('expressions', expressionSchema);

// make this available to our Nodes in our Node applications
module.exports = intent;
