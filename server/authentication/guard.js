const _ = require('lodash');
/**
 * A guard checks to make sure the user has the permissions required for this route.
 */

function guard(...allowed) {
  return (req, res, next) => {
    const { permissions } = res.locals; // he has dialog:write
    const checkFor = allowed[0]; // he needs dialog:read // convert to
    if (_.includes(permissions, '*') || _.includes(permissions, checkFor)) {
      next();
    } else {
      const split = checkFor.split(':');
      if (split[1] === 'read' && _.includes(permissions, `${split[0]}:write`)) {
        next();
      } else if (split[1] === 'read') {
        res
          .status(376)
          .send(`Sorry you don't have permission to see this: ${split[1]}`);
      } else {
        res.status(401).send("Sorry you can't edit this.");
      }
    }
  };
}

module.exports = guard;
