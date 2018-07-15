const jwt = require('jsonwebtoken');
const debug = require('debug')('isAuthenticated');
const User = require('./models/user');
const permissions = require('../mongo/schemas/permissionsSchema');
const _ = require('lodash');
/**
 * Checks the user is authenticated, and attached the users permissions to the response.
 * @param req
 * @param res
 * @param next
 */
function isAuthenticated(req, res, next) {
  jwt.verify(
    req.headers.authorization,
    process.env.JWTSECRET,
    (err, decoded) => {
      if (err) {
        return res.status(375).send('Please login again. Redirecting...');
      }
      return User.findOne(
        { email: decoded },
        '-_id -password -email -gravatar -name -__V',
      )
        .lean()
        .exec()
        .then(user =>
          permissions
            .find({})
            .lean()
            .exec()
            .then(perm => {
              let perms = _.find(perm, { type: 'role', name: user.role })
                .permissions; // Get permissions for user's role

              user.groups.forEach(group => {
                perms = perms.concat(
                  _.find(perm, { type: 'group', name: group }).permissions,
                ); // For each group the user is in, add the permissions.
              });

              perms = _.uniq(perms.concat(user.permissions)); // Combine and unique permissions.

              res.header('permissions', JSON.stringify(perms));

              res.locals.permissions = perms;

              next();
              return null;
            }),
        )
        .catch(error => {
          debug(error);
          return res
            .status(375)
            .send(
              'There has been an error authenticating you. Please try logging out and In again.',
            );
        });
    },
  );
}

module.exports = isAuthenticated;
