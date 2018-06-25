const jwt = require('jsonwebtoken');
const User = require('./models/user');
const PassportLocalStrategy = require('passport-local').Strategy;
/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    User.count().then(count => {
      User.create({
        email: email.trim().toLowerCase(),
        password,
        role: count === 0 ? 'admin' : 'reader',
        groups: [],
        roles: [],
        name: req.body.name,
      })
        .then(user => {
          const token = jwt.sign(user.email, process.env.JWTSECRET);
          delete user.password;
          return done(null, token, user);
        })
        .catch(err => done(err));
    });
  },
);
