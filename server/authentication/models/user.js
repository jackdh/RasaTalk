const mongoose = require('../../mongo/schemas/chatbot_db_connect');
const bcrypt = require('bcryptjs');
const MD5 = require('md5');

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  name: String,
  role: String,
  groups: [String],
  permissions: [String],
  gravatar: String,
  date: { type: Date, default: Date.now },
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(
  password,
  callback,
) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  user.gravatar = `https://www.gravatar.com/avatar/${MD5(
    user.email.trim().toLowerCase(),
  )}`;

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      // replace a password string with hash value
      user.password = hash;
      return next();
    });
  });
});

const users = mongoose.model('User', UserSchema);

module.exports = users;
