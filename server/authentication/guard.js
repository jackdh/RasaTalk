const _ = require('lodash');
/**
 * A guard checks to make sure the user has the permissions required for this route.
 */

function guard(...required) {
  return (req, res, next) => {
    const { permissions } = res.locals;

    const allPerms = [];
    permissions.forEach(p => {
      const split = p.split(':');
      if (split[1] === 'write') {
        allPerms.push(`${split[0]}:read`);
      }
      allPerms.push(p);
    });
    if (
      _.includes(permissions, '*') ||
      (_.every(required, x => _.includes(allPerms, x)) &&
        hasCustomPermission(req, allPerms))
    ) {
      next();
    } else {
      res.status(375).send(`Sorry you don't have permission to see this.`);
    }
  };
}

function hasCustomPermission(req, permissions) {
  if (req.params.talkWrapper) {
    return _.includes(
      permissions,
      `${req.params.talkWrapper}:${req.method === 'GET' ? 'read' : 'write'}`,
    );
  } else if (req.params.agent) {
    if (req.route.path === '/training/parse/:agent') {
      return _.includes(permissions, `${req.params.agent}:read`);
    }
    return _.includes(
      permissions,
      `${req.params.agent}:${req.method === 'GET' ? 'read' : 'write'}`,
    );
  }
  return true;
}

module.exports = guard;
