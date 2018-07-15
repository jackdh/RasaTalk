const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const messageHistorySchema = new Schema(
  {
    _id: { type: String, required: true },
    details: { type: Schema.Types.Mixed },
    history: [
      {
        text: { type: String, default: null },
        type: { type: String, default: null },
        time: { type: Date, default: Date.now },
        quick_replies: { type: Schema.Types.Mixed },
      },
    ],
  },
  { usePushEach: true },
);

const node = mongoose.model('messageHistories', messageHistorySchema);

// make this available to our Nodes in our Node applications
module.exports = node;
