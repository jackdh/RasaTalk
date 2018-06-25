const DialogSchema = require('../../schemas/dialogSchema');
const debug = require('debug')('dialog/get');
const Convert = require('../utils/converstions');

/**
 * Pulls out a single intent
 *
 * @param req
 * @param res
 */
const getNode = (req, res) => {
  DialogSchema.findOne({ 'intent.name.uid': req.params.uid })
    .lean()
    .exec()
    .then(node => {
      res.send(node.intent);
    });
};

function getParentAndChildren(req, res) {
  const uid = req.params.uid;
  if (uid) {
    Convert.getParent(uid).then(data => {
      res.send(data);
    });
  } else {
    res.sendStatus(400).send('No Parent with that ID');
  }
}

/**
 * Will return the parent nodes which can be accessed via the chatbot
 * It will not include jumped to nodes such as "helpful" or "email assistance"
 * @param req
 * @param res
 */
function getParents(req, res) {
  // TODO setup cache
  getParentsInternal()
    .then(d => {
      res.send(d);
    })
    .catch(e => {
      debug('Unable to generate parents. %O', e);
      res.sendStatus(500);
    });
}

/**
 * We do not return items with Regex / Conditions due to only wanting real parents and not jumped to ones.
 * @returns {Promise<any>}
 */
function getParentsInternal() {
  return new Promise((resolve, reject) => {
    DialogSchema.find({
      $and: [{ parent: null }],
    })
      .lean()
      .exec()
      .then(data => {
        const groups = [];
        for (const node of data) {
          if (!node.intent.name.group) node.intent.name.group = 'Default Nodes';
          groups.push({
            uid: node.intent.name.uid,
            name: node.intent.name.name,
            group: node.intent.name.group,
          });
        }
        resolve(groups);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function flow() {
  return new Promise(resolve => {
    DialogSchema.find({})
      .lean()
      .exec()
      .then(arrOfArr => {
        resolve(Convert.convert(arrOfArr));
      })
      .catch(error => {
        debug('Error in flow %O', error);
        throw error;
      });
  });
}

module.exports = {
  getParents,
  getNode,
  getParentAndChildren,
  flow,
};
