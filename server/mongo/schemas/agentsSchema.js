const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const agentSchema = new Schema(
  {
    _id: { type: String, required: true },
    agent: { type: String, required: true, unique: true },
    avatar: String,
    subtitle: String,
    description: String,
    intents: [
      {
        name: {
          type: String,
          required: true,
          sparse: true,
        },
        expressions: [{ type: Schema.Types.ObjectId, ref: 'expressions' }],
        regex: [String],
      },
    ],
  },
  { usePushEach: true },
);

const intent = mongoose.model('agents', agentSchema);

module.exports = intent;
