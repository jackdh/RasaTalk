/* eslint-disable no-param-reassign */
const DialogSchema = require('../../schemas/nodeSchema');
const cache = require('global-cache');
const debug = require('debug')('Converstions');
/**
 * Turns the database to the array flow.
 *
 * @param arrOfArr
 * @returns {Array}
 */
function convert(arrOfArr) {
  const all = {};
  arrOfArr.forEach(node => {
    all[node.intent.name.uid] = node;
  });
  cache.set('mapCache', all);

  let children = [];
  const parents = [];
  if (arrOfArr.length === 0) return [];

  let pointer = arrOfArr[0];

  function recursive(recAll, recPoint, final, toObject) {
    if (recPoint.child) {
      recursive(recAll, recAll[recPoint.child], final, toObject);
    }
    recPoint.intent.slots.forEach(slot => {
      final.push(slot);
    });
    recPoint.intent.parent = recPoint.parent;
    recPoint.intent.child = recPoint.child;
    if (toObject) {
      final.push(recPoint.intent.toObject());
    } else {
      final.push(recPoint.intent);
    }
    if (recPoint.next) {
      recursive(recAll, recAll[recPoint.next], final, toObject);
    }
    return final;
  }

  function extracted() {
    if (pointer.intent.enabled) {
      if (pointer.child) {
        const items = recursive(all, all[pointer.child], []);
        children = children.concat(items);
      }
      parents.push(pointer.intent);
      pointer.intent.child = pointer.child; // TODO refactor this
    }

    pointer = all[pointer.next];
  }

  if (pointer) {
    /** Navigate to top */
    while (pointer.parent) pointer = all[pointer.parent];
    while (pointer.previous) pointer = all[pointer.previous];

    while (pointer) extracted();
  }
  const final = children.concat(parents);
  return final;
}

function getParentNew(uid) {
  return new Promise(resolve => {
    hashMap().then(map => {
      const test = nodeDetails(map, map[uid]);
      resolve(test[0]);
    });
  }).catch(err => {
    debug(err);
  });
}

/**
 * This is what is sent back to Rasa Talk to display on the Talk page.
 *
 * @param map
 * @param node
 * @returns {Array}
 */
function nodeDetails(map, node) {
  let all = [];
  if (node) {
    const details = {
      name: node.intent.name.name,
      uid: node.intent.name.uid,
      intent: node.intent.condition,
      enabled: node.intent.enabled,
      details: {
        responses: node.intent.responses ? node.intent.responses.length : 0,
        slots: node.intent.slots ? node.intent.slots.length : 0,
      },
      children: [],
    };

    if (node.child) {
      const map2 = map[node.child];
      if (!map2) {
        debug(
          `Node ${node.intent.name.uid} is pointing to missing child node:${
            node.child
          }`,
        ); // TODO find cause of nodes not being aved correctly.
        node.child = null;
        node.save();
      } else {
        details.children = nodeDetails(map, map2);
      }
    }
    all.push(details);

    const { next } = node;
    if (next && node.parent !== null) {
      const nextNode = map[next];
      if (!nextNode) {
        debug(
          `Node ${
            node.intent.name.uid
          } is pointing to missing sibling node:${next}`,
        ); // TODO find cause of nodes not being aved correctly.
        node.next = null;
        node.save();
      }
      all = all.concat(nodeDetails(map, nextNode));
    }
  }
  return all;
}

/**
 * Returns a hashmap of all the nodes.
 *
 * @returns {Promise} -> HashMap
 */
function hashMap() {
  return new Promise(resolve => {
    DialogSchema.find({}, (err, arrOfArr) => {
      if (err) throw err;
      const all = {};
      arrOfArr.forEach(node => {
        all[node.intent.name.uid] = node;
      });
      resolve(all);
    });
  });
}

module.exports = {
  convert,
  hashMap,
  getParent: getParentNew,
};
