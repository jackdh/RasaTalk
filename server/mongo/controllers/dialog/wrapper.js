const NodeWrapper = require('../../schemas/nodeWrapperSchema');
const {
  addPermission,
  addPermissionToUser,
  deletePermission,
} = require('../permissions/permissions');
const co = require('co');
const debug = require('debug')('Wrappers');
const { validateWrapper } = require('../utils/validators');

function createNodeWrapper(req, res) {
  const { name, avatar, subtitle, description } = req.body;

  co(function* t() {
    yield validateWrapper.validate(req.body);

    const ciName = new RegExp(['^', name, '$'].join(''), 'i');
    const model = yield NodeWrapper.findOne({ name: ciName });
    if (model) {
      throw new Error('Sorry that group name is taken');
    }

    yield NodeWrapper.create({
      name,
      _id: `ng-${name}`,
      avatar,
      subtitle,
      description,
    });

    yield addPermission(`ng-${name}`);
    yield addPermissionToUser(`ng-${name}`, res.locals.user);

    return `Created: ${name}`;
  })
    .then(done => {
      res.status(275).send(done);
    })
    .catch(err => {
      debug(err);
      res.status(475).send(err.message);
    });
}

function getNodeWrappers(req, res) {
  co(function* t() {
    const userPerms = res.locals.permissions.map(perm => {
      const pos = perm.lastIndexOf(':');
      return perm.substring(0, pos);
    });

    // const permissions = _.uniq(userPerms);

    return yield NodeWrapper.find({ _id: { $in: userPerms } })
      .lean()
      .exec();
  })
    .then(wrappers => {
      res.send(wrappers);
    })
    .catch(err => {
      debug(err);
      res.status(375).send(err);
    });
}

function updateNodeWrapper(req, res) {
  co(function* t() {
    yield validateWrapper.validate(req.body);
    yield NodeWrapper.replaceOne({ _id: req.body._id }, req.body);
  })
    .then(() => {
      res.status(275).send(`Updated: ${req.body._id}`);
    })
    .catch(e => {
      debug(e);
      res.status(475).send(e.message);
    });
}

function deleteNodeWrapper(req, res) {
  co(function* t() {
    const model = yield NodeWrapper.deleteOne({ _id: req.params.talkWrapper });
    yield deletePermission(req.params.talkWrapper);
    return model;
  })
    .then(m => {
      if (m.n > 0) {
        res.status(275).send(`Removed: ${req.params.talkWrapper}`);
      } else {
        res.status(401).send(`Failed Removing: ${req.params.talkWrapper}`);
      }
    })
    .catch(e => {
      debug(e);
      res.status(401).send(`Failed removing that: ${req.params.talkWrapper}`);
    });
}

module.exports = {
  getNodeWrappers,
  createNodeWrapper,
  updateNodeWrapper,
  deleteNodeWrapper,
};
