const mongoose = require('./chatbot_db_connect');
const { Schema } = mongoose;

const quickReply = new Schema({
  title: String,
  payload: String,
  url: String,
});

// create a schema
const nodeSchema = new Schema({
  next: String,
  previous: String,
  parent: String,
  child: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  wrapperName: { type: String, default: 'default' },
  intent: {
    enabled: { type: Boolean, default: false },
    name: {
      name: String,
      group: String,
      uid: { type: String, unique: true },
    },
    recognises: {
      isJumpedTo: Boolean,
      condition: String,
      regex: String,
      regexFlags: String,
    },
    responses: [
      {
        condition: String,
        output: [String],
        outputType: String,
        uid: String,
      },
    ],
    slots: [
      {
        slotID: String,
        context: String,
        entity: String,
        parent: String,
        prompt: String,
        nodeType: String,
        defaultPrompt: String,
        uid: String,
        required: { type: Boolean, default: false },
        defaultValue: { type: String, default: '' },
      },
    ],
    quick_replies: [quickReply],
    jump: {
      to: String,
      condition: String,
    },
    save: {
      name: String,
      condition: String,
    },
    webhook: {
      enabled: { type: Boolean, default: false },
      type: { type: String, default: 'GET' },
      to: String,
      body: String,
      save: { type: Boolean, default: false },
      success: String,
      failure: String,
      variables: [
        {
          path: String,
          as: String,
        },
      ],
    },
  },
});

// the schema is useless so far
// we need to create a model using it
const node = mongoose.model('nodes', nodeSchema);

// make this available to our Nodes in our Node applications
module.exports = node;
