const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

const entitiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    synonyms: [
      {
        synonym_reference: { type: String, required: true },
        list: [
          {
            type: String,
          },
        ],
      },
    ],
    date: { type: Date, default: Date.now },
  },
  { usePushEach: true },
);

// the schema is useless so far
// we need to create a model using it
const entities = mongoose.model('entities', entitiesSchema);

// make this available to our Nodes in our Node applications
module.exports = entities;
