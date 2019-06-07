const jwt = require('jsonwebtoken');
const debug = require('debug')('isAuthenticated');
const User = require('./models/user');
const permissions = require('../mongo/schemas/permissionsSchema');
const _ = require('lodash');
const co = require('co');

const verify = auth =>
  new Promise((resolve, reject) => {
    jwt.verify(auth, process.env.JWTSECRET, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

/**
 * Checks the user is authenticated, and attached the users permissions to the response.
 * @param req
 * @param res
 * @param next
 */
function isAuthenticated(req, res, next) {
  co(function* t() {
    const auth = _.replace(req.headers.authorization, 'Bearer ', '');

    const decoded = yield verify(auth);

    const user = yield User.findOne(
      { email: decoded },
      '-_id -password -email -gravatar -name -__V',
    )
      .lean()
      .exec();

    if (!user.role) user.role = [];

    const perm = yield permissions
      .find({})
      .lean()
      .exec();

    let perms = _.find(perm, { type: 'role', name: user.role }).permissions; // Get permissions for user's role

    if (_.includes(perms, '*')) {
      perms = _.find(perm, { type: 'permissions' }).permissions;
    } else {
      user.groups.forEach(group => {
        perms = perms.concat(
          _.find(perm, { type: 'group', name: group }).permissions,
        ); // For each group the user is in, add the permissions.
      });

      perms = _.uniq(perms.concat(user.permissions)); // Combine and unique permissions.
    }

    perms.forEach(permis => {
      const rest = permis.substring(0, permis.lastIndexOf(':'));
      const last = permis.substring(permis.lastIndexOf(':'), permis.length);
      if (last === ':write' && !_.includes(perms, `${rest}:read`)) {
        perms.push(`${rest}:read`);
      }
    });

    res.header('permissions', JSON.stringify(perms));

    res.locals.permissions = perms;
    res.locals.user = decoded;
  })
    .then(() => {
      next();
    })
    .catch(err => {
      debug(err);
      return res.status(375).send('Please login again. Redirecting...');
    });
}

module.exports = isAuthenticated;
