const mongoose = require('./chatbot_db_connect');

const { Schema } = mongoose;

// const permSchema = new Schema({
//   roles: [{
//     name: { type: String, required: true },
//     permissions: [String],
//   }],
//   groups: [{
//     name: { type: String, required: true },
//     permissions: [String],
//   }],
//   permissions: [String],
// });

const permSchema = new Schema({
  type: String,
  name: String,
  permissions: [String],
});

permSchema.pre('save', next => {
  // if created_at doesn't exist, add to that field
  next();
});

// the schema is useless so far
// we need to create a model using it
const session = mongoose.model('permissions', permSchema);

// make this available to our Nodes in our Node applications
module.exports = session;
