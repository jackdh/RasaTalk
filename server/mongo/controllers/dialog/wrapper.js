const NodeWrapper = require('../../schemas/nodeWrapperSchema');
const co = require('co');

function createNodeWrapper(req, res) {
  const { name } = req.body;

  co(function* t() {
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
