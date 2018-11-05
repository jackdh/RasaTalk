/* eslint-disable no-param-reassign */
const DialogSchema = require('../../schemas/nodeSchema');
const debug = require('debug')('dialog/get');
const Convert = require('../utils/converstions');
const co = require('co');
/**
 * Pulls out a single intent
 *
 * @param req
 * @param res
 */
const getNode = (req, res) => {
  co(function* t() {
    const node = yield DialogSchema.findOne({
      'intent.name.uid': req.params.uid,
    })
      .lean()
      .exec();

    return node.intent;
  })
    .then(node => {
      res.send(node);
    })
    .catch(e => {
      debug(e);
      res.status(375).send('Failed getting that node');
    });
};

function getParentAndChildren(req, res) {
  const { uid, talkWrapper } = req.params;
  if (uid) {
    Convert.getParent(talkWrapper, uid).then(data => {
      res.send(data);
    });
  } else {
    res.sendStatus(475).send('No Parent with that ID');
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
  getParentsInternal(req.params.talkWrapper)
    .then(d => {
      res.send(d);
    })
    .catch(e => {
      debug('Unable to generate parents. %O', e);
      res.status(475).send('Unable to generate Parents');
    });
}

function formatParent(node) {
  return {
    uid: node.intent.name.uid,
    name: node.intent.name.name,
    group: node.intent.name.group ? node.intent.name.group : 'Default Nodes',
  };
}

/**
 * We do not return items with Regex / Conditions due to only wanting real parents and not jumped to ones.
 * @returns {Promise<any>}
 */
function getParentsInternal(talkWrapper) {
  return co(function* t() {
    const data = yield DialogSchema.find({
      $and: [{ parent: null }],
      wrapperName: talkWrapper,
    })
      .lean()
      .exec();
    if (!data.length) return [];
    const all = {};
    data.forEach(node => {
      all[node.intent.name.uid] = node;
    });

    const final = [];
    let head = all[Object.keys(all)[0]];
    while (head.previous) head = all[head.previous];
    while (head.next) {
      final.push(formatParent(head));
      head = all[head.next];
    }
    final.push(formatParent(head));
    return final;
  });
}

function flow(talkWrapper) {
  return new Promise(resolve => {
    DialogSchema.find({ wrapperName: talkWrapper })
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
