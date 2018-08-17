/* eslint-disable camelcase */
const co = require('co');
const axios = require('axios');
const debug = require('debug')('analytics');
const expressionSchema = require('../schemas/expressionsSchema');
const messageHistorySchema = require('../schemas/messageHistorySchema');
const intentSchema = require('../schemas/intentsSchema');
const dialogSchema = require('../schemas/dialogSchema');
const sessionSchema = require('../schemas/sessionSchema');
const userSchema = require('../../authentication/models/user');

function getDashboard(req, res) {
  co(function* doCo() {
    const [
      expressions,
      messageHistorys,
      agents,
      dialogs,
      sessions,
      users,
    ] = yield [
      expressionSchema.count(),
      messageHistorySchema.count(),
      intentSchema.count(),
      dialogSchema.count(),
      sessionSchema.count(),
      userSchema.count(),
    ];
    return {
      expressions,
      messageHistorys,
      agents,
      dialogs,
      sessions,
      users,
    };
  }).then(
    value => {
      res.send(value);
    },
    err => {
      debug(err.stack);
    },
  );
}

function getRasaStats(req, res) {
  co(function* getRStats() {
    const {
      data: { available_projects },
    } = yield axios.get(`${process.env.RASASERVER}/status`);
    return Object.keys(available_projects).length;
  })
    .then(value => {
      res.send({
        online: true,
        projects: value,
      });
    })
    .catch(error => {
      debug('Rasa Error %O', error);
      res.send({
        online: false,
      });
    });
}

module.exports = {
  getDashboard,
  getRasaStats,
};
