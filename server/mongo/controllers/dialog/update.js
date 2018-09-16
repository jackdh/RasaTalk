/* eslint-disable no-param-reassign */
const DialogSchema = require('../../schemas/dialogSchema');
const Convert = require('../utils/converstions');
const Cache = require('../utils/cache');
const debug = require('debug')('dialog.js');

function validateUpdate(node) {
  if (!node.head) {
    return { valid: false, reason: 'Missing head' };
  }
  return { valid: true };
}

/**
 * New update for Rasa Talk
 *
 * @param req
 * @param res
 */
function update(req, res) {
  const validateUpdate1 = validateUpdate(req.body);
  if (!validateUpdate1.valid) {
    res.status(475).send(validateUpdate1.reason);
  } else {
    DialogSchema.findOneAndUpdate(
      { 'intent.name.uid': req.params.uid },
      { $set: { intent: req.body } },
    )
      .then(() => {
        Convert.getParent(req.body.head).then(data => {
          if (!data) throw new Error('Failed to convert in update');
          data.statusMessage = 'Node Saved';
          res.status(275).send(data);
          return null;
        });
      })
      .catch(error => {
        debug(error);
        res.status(475).send('Failed saving, please check the logs for errors');
      });
  }
}

function toggle(req, res) {
  const { uid } = req.params;
  DialogSchema.findOne({ _id: `intent_${uid}` })
    .then(model => {
      model.enabled = !model.enabled;
      model.save().then(() => {
        const map = Cache.get('mapCache'); // Update this to use the new cache.
        map[uid].enabled = !map[uid].enabled;
        Cache.set('mapCache', map);
        res.send(200);
      });
    })
    .catch(err => {
      debug(err);
      res.sendStatus(500);
    });
}

module.exports = {
  update,
  toggle,
};
