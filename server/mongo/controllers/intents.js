const IntentSchema = require('../schemas/intentsSchema');
const debug = require('debug')('Intents');

const addIntent = (req, res) => {
  const agent = req.params.agent;
  const intent = req.body.intent;
  if (!intent || intent === '') {
    res.sendStatus(400);
    return;
  }

  IntentSchema.update(
    { agent, 'intents.name': { $ne: intent } },
    { $addToSet: { intents: { name: intent } } },
    { _id: false },
  )
    .then(({ nModified }) => {
      if (nModified === 0) {
        res.status(475).send('Sorry that intent already exists.');
      } else {
        res.sendStatus(200);
      }
    })
    .catch(error => {
      res.send(error);
    });
};

const removeIntent = (req, res) => {
  const agent = req.params.agent;
  const intents = req.body;
  IntentSchema.update(
    { agent },
    { $pull: { intents: { name: { $in: intents } } } },
    { safe: true },
  )
    .then(model => {
      if (model.nModified === 0) {
        res.status(475).send("Looks like that doesn't exist in the DB");
      } else {
        res.status(275).send(`Removed ${intents.join(', ')}`);
      }
    })
    .catch(err => {
      debug(err);
      res
        .status(475)
        .send('Sorry we failed removing those. Please check the logs.');
    });
};

const updateIntent = (req, res) => {
  const agent = req.params.agent;
  const oldIntentName = req.params.intentName;
  const intentName = req.body.intentName;

  IntentSchema.findOne({ agent, 'intents.name': intentName }, (err, model) => {
    if (err) {
      debug(err);
      res
        .status(475)
        .send('Something went wrong on the backend. Please check the logs');
    } else if (model) {
      res.status(475).send('Sorry that intent already exists.');
    } else {
      IntentSchema.update(
        { agent, 'intents.name': oldIntentName },
        { $set: { 'intents.$.name': intentName } },
        updateError => {
          if (updateError) {
            debug(updateError);
            res
              .status(475)
              .send(
                'Something went wrong on the backend. Please check the logs',
              );
          } else {
            res.status(275).send('Intent updated.');
          }
        },
      );
    }
  });
};

const getIntents = (req, res) => {
  const agent = req.params.agent;

  IntentSchema.findOne({ agent }, '-_id -__v -intents.expressions -intents._id')
    .lean()
    .exec((err, model) => {
      if (err || model === null) {
        res.sendStatus(400);
      } else {
        if (model.intents === null) {
          model.intents = []; // TODO set default in schema.
        }
        res.send(model);
      }
    });
};

module.exports = {
  addIntent,
  removeIntent,
  getIntents,
  updateIntent,
};
