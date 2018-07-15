/* eslint-disable no-param-reassign */
// const db = require('../mongo/mongodb');
const SessionSchema = require('../schemas/sessionSchema');
const debug = require('debug')('session');

/**
 * Gets the session or creates one.
 * @param userID
 * @returns {Promise}
 */
function getSessionInternal(userID) {
  return new Promise(resolve => {
    SessionSchema.findOne({ sessionID: userID })
      .then(model => {
        if (model) {
          resolve(model);
        } else {
          SessionSchema.create({ sessionID: userID }).then(m => {
            m.entities = {
              context: {},
              saved: {},
            };
            return resolve(m);
          });
        }
      })
      .catch(error => {
        debug(error);
      });
  });
}

module.exports = {
  getSessionInternal,
};
