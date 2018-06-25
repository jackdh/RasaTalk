const mongoose = require('./chatbot_db_connect');

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    context: String,
    entities: {
      context: Schema.Types.Mixed,
      saved: Schema.Types.Mixed,
    },
    sessionID: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    path: { type: [String], default: [] },
    updated_at: Date,
    created_at: Date,
    previousContext: [[String]],
    saveNext: String,
    failedGuesses: { type: Number, default: 0, min: 0 },
    previousQuestion: Schema.Types.Mixed,
    changingContext: String,
    inConversation: { type: Boolean, default: false },
  },
  { usePushEach: true, minimize: false },
);

// the schema is useless so far
// we need to create a model using it
const session = mongoose.model('sessions', sessionSchema);

// make this available to our Nodes in our Node applications
module.exports = session;
