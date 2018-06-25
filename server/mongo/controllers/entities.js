const EntitiesSchema = require('../schemas/entitiesSchema');
const debug = require('debug')('Entities');
const debugS = require('debug')('Entities - Synonyms');

function getEntities(req, res) {
  EntitiesSchema.find({}, '-synonyms')
    .lean()
    .exec()
    .then(entities => {
      res.send(entities);
    })
    .catch(error => {
      debug(error);
      res.sendStatus(404);
    });
}

function addEntitiy(req, res) {
  const { entity } = req.body;
  EntitiesSchema.create({ name: entity })
    .then(() => res.sendStatus(200))
    .catch(error => {
      if (error.message.includes('duplicate')) {
        res.status(401).send('That entity already exists.');
      } else {
        res
          .status(401)
          .send('Something went wrong on the backend. Please check the logs');
      }
    });
}

function deleteEntity(req, res) {
  const { entities } = req.body;

  return EntitiesSchema.remove({ name: { $in: entities } })
    .then(() => {
      res.status(275).send(`Removed: ${entities.join(', ')}`);
    })
    .catch(() => {
      res.status(401).send(`Failed Removing: ${entities.join(', ')}`);
    });
}

function getSynonyms(req, res) {
  const { entity } = req.params;

  EntitiesSchema.findOne({ name: entity })
    .lean()
    .exec()
    .then(model => {
      res.send(model.synonyms);
    })
    .catch(error => {
      debugS(error);
      res.status(401).send('Failed loading synonyms please check the logs.');
    });
}

function updateVariants(req, res) {
  const { entity } = req.params;
  const { synonym, variants } = req.body;

  EntitiesSchema.update(
    { name: entity, 'synonyms.synonym_reference': synonym },
    { $set: { 'synonyms.$.list': variants } },
  )
    .then(() => {
      res.status(275).send('Variant Updated.');
    })
    .catch(error => {
      debugS(error);
      res.status(401).send('Failed loading synonyms please check the logs.');
    });
}

function addSynonym(req, res) {
  const { entity, synonym } = req.params;
  EntitiesSchema.update(
    { name: entity },
    { $push: { synonyms: { synonym_reference: synonym, list: [] } } },
  )
    .then(() => {
      res.status(275).send(`${synonym} added`);
    })
    .catch(error => {
      debugS(error);
      res
        .status(401)
        .send('Failed adding that synonym. Please check the logs.');
    });
}

function removeSynonyms(req, res) {
  const { entity } = req.params;
  const { synonyms } = req.body;
  EntitiesSchema.update(
    { name: entity },
    { $pull: { synonyms: { synonym_reference: { $in: synonyms } } } },
  )
    .then(() => {
      res.status(275).send(`${synonyms.join(', ')} removed`);
    })
    .catch(error => {
      debugS(error);
      res
        .status(401)
        .send('Failed removing those synonym(s). Please check the logs.');
    });
}

module.exports = {
  getEntities,
  addEntitiy,
  deleteEntity,
  getSynonyms,
  updateVariants,
  addSynonym,
  removeSynonyms,
};
