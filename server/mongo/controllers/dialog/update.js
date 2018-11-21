/* eslint-disable no-param-reassign */
const DialogSchema = require('../../schemas/nodeSchema');
const Convert = require('../converstions');
const debug = require('debug')('dialog.js');
const co = require('co');

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

  co(function* t() {
    const { uid, talkWrapper } = req.params;
    if (!validateUpdate1.valid) throw new Error(validateUpdate1.reason);

    yield DialogSchema.findOneAndUpdate(
      { 'intent.name.uid': uid },
      { $set: { intent: req.body } },
    );

    const data = yield Convert.getParent(talkWrapper, req.body.head);
    if (!data) throw new Error('Failed to find that node');
    data.statusMessage = 'Node Saved!';
    return data;
  })
    .then(s => {
      res.status(275).send(s);
    })
    .catch(e => {
      debug(e);
      res.status(375).send(e.message);
    });
}

function toggle(req, res) {
  // TODO I don't think this is used any more remove.
  const { uid } = req.params;
  co(function* t() {
    const model = yield DialogSchema.findOne({ _id: `intent_${uid}` });
    model.enabled = !model.enabled;
    yield model.save();
    return true;
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(e => {
      debug(e);
      res.status(475).send('Failed toggling that node.');
    });
}

module.exports = {
  update,
  toggle,
};
