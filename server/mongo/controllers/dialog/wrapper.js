const NodeWrapper = require('../../schemas/nodeWrapperSchema');
const co = require('co');
const _ = require('lodash');

function createNodeWrapper(req, res) {
  const { name } = req.body;

  co(function* t() {
    if (!_.isString(name)) throw new Error('Please give a string name');
    const model = yield NodeWrapper.find({ name });
    if (model) {
      throw new Error('A group by that name exists');
    }
    yield NodeWrapper.create({ name });
    return `Created: ${name}`;
  })
    .then(done => {
      res.status(275).send(done);
    })
    .catch(err => {
      res.status(475).send(err);
    });
}

module.exports = {
  createNodeWrapper,
};
