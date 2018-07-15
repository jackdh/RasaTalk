/* eslint-disable no-param-reassign */
const HistorySchema = require('../schemas/messageHistorySchema');
const debug = require('debug')('messageHistory');

function addToHistoryBot(uid, replies) {
  replies.forEach(reply => {
    reply.type = 'bot';
  });
  return HistorySchema.findOneAndUpdate(
    { _id: uid },
    { $push: { history: { $each: replies } } },
    { new: true },
  );
}

const addToHistory = (id, message) =>
  new Promise((resolve, reject) => {
    HistorySchema.update(
      { _id: id },
      { $push: { history: message } },
      { upsert: true },
    )
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });

function getHistory(req, res) {
  const { uid } = req.params;

  HistorySchema.findOne({ _id: uid })
    .lean()
    .exec()
    .then(model => {
      if (!model) {
        res.send([]);
      } else {
        res.send(model.history);
      }
    })
    .catch(() => {
      debug(`Error looking up history for: '${uid}'`);
      res.sendStatus(400);
    });
}

module.exports = {
  history: getHistory,
  addToHistoryBot,
  addToHistory,
};
