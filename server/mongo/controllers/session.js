/* eslint-disable no-param-reassign */
// const db = require('../mongo/mongodb');
const SessionSchema = require('../schemas/sessionSchema');
const debug = require('debug')('session');
const co = require('co');

/**
 * Gets the session or creates one.
 * @param userID
 * @returns {Promise}
 */
const getSessionInternal = userID =>
  co(function* t() {
    const model = yield SessionSchema.findOne({ sessionID: userID });

    if (model) {
      if (!model.entities.saved) {
        model.entities.saved = {};
      }
      return model;
    }
    const newModel = yield SessionSchema.create({ sessionID: userID });
    newModel.entities = {
      context: {},
      saved: {},
    };
    return newModel;
  })
    .then(data => data)
    .catch(error => {
      debug(error);
    });

module.exports = {
  getSessionInternal,
};
