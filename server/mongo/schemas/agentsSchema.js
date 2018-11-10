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

// agentSchema.pre('save', function preSave(next) {
//   if (this.isNew && this.intents.length === 0) {
//     this.intents = undefined;
//   }
//   next();
// });

// the schema is useless so far
// we need to create a model using it
const intent = mongoose.model('agents', agentSchema);

// make this available to our Nodes in our Node applications
module.exports = intent;
