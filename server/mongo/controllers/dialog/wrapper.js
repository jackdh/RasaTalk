const yup = require('yup');
const NodeWrapper = require('../../schemas/nodeWrapperSchema');
const {
  addPermission,
  addPermissionToUser,
} = require('../permissions/permissions');
const co = require('co');
const debug = require('debug')('Wrappers');

const schema = yup.object().shape({
  avatar: yup.string().url(),
  name: yup
    .string()
    .min(2, 'Please enter a longer agent name')
    .max(50, 'Please enter a shorter name (50)')
    .required('Name is required.'),
  subtitle: yup.string().max(100, 'Please enter a shorter subtitle (100)'),
  description: yup.string().max(100, 'Please enter a shorter desc (100)'),
});

function createNodeWrapper(req, res) {
  const { name, avatar, subtitle, description } = req.body;

  co(function* t() {
    yield schema.validate(req.body);

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

module.exports = {
  getNodeWrappers,
  createNodeWrapper,
};
