const ThirdPartySchema = require('../schemas/thirdPartySchema');
const debug = require('debug')('ThirdParty');

function getThirdParties(req, res) {
  ThirdPartySchema.find({})
    .lean()
    .exec()
    .then(model => {
      res.send(model);
    });
}

function updateFacebook(req, res) {
  debug('Updating facebook %O', req.body);
  req.body.type = 'facebook';
  ThirdPartySchema.update({ type: 'facebook' }, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
  }).then(() => {
    res.status(275).send('Facebook updated!');
  });
}

module.exports = {
  getThirdParties,
  updateFacebook,
};
