const mongoose = require('./chatbot_db_connect');

const Schema = mongoose.Schema;

const smallTalkSchema = new Schema(
  {
    name: { type: String, required: true },
    options: {
      enabled: { type: Boolean, default: false },
      prefix: { type: String, default: '#small-talk_' },
    },
    smallTalk: [
      {
        name: String,
        training: [String],
        responses: [String],
      },
    ],
  },
  { usePushEach: true },
);

// the schema is useless so far
// we need to create a model using it
const smallTalk = mongoose.model('small-talks', smallTalkSchema);

// make this available to our Nodes in our Node applications
module.exports = smallTalk;
