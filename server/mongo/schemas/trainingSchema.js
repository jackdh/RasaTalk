const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const trainingSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    data: Object,
    model: { type: String, default: 'Not Trained' },
    agent: { type: String, required: true },
    training: { type: Boolean, default: false },
    trained: { type: Boolean, default: false },
    timeTaken: String,
  },
  { usePushEach: true },
);

// the schema is useless so far
// we need to create a model using it
const intent = mongoose.model('trainings', trainingSchema);

// make this available to our Nodes in our Node applications
module.exports = intent;
