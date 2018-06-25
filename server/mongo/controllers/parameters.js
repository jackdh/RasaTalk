const ExpressionsSchema = require('./../schemas/expressionsSchema');
const debug = require('debug')('Parameters');
/** *
 * NEW
 */

function removeParameter(req, res) {
  const { start, end, _id } = req.params;
  ExpressionsSchema.findOneAndUpdate(
    { _id },
    { $pull: { entities: { start, end } } },
  )
    .then(() => {
      res.status(275).send('Removed parameter');
    })
    .catch(() => {
      debug('Failed removing parameter');
      res
        .status(475)
        .send("Couldn't remove that parameter. Please check the logs");
    });
}

function updateParameter(req, res) {
  const { start, end, entity, value, _id } = req.body;

  ExpressionsSchema.findOneAndUpdate(
    { _id },
    { $pull: { entities: { start, end } } },
  )
    .then(() => {
      const parameter = { start, end, entity, value };
      ExpressionsSchema.findOneAndUpdate(
        { _id },
        { $push: { entities: parameter } },
      ).then(() => {
        res.status(275).send('Parameter Saved');
      });
    })
    .catch(() => {
      debug('Failed adding / updating parameter');
      res.status(475).send(`Failed updating ${value}. Please check the logs`);
    });
}

module.exports = {
  removeParameter,
  updateParameter,
};
