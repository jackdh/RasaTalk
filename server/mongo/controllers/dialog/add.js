/* eslint-disable no-param-reassign */
const DialogSchema = require('../../schemas/nodeSchema');
const Convert = require('../utils/converstions');
const generateUID = require('../utils/generateUID');
const debug = require('debug')('dialog.js');
const isEmpty = require('lodash/isEmpty');

function addToExisting(req, res) {
  const saveAll = [];
  const id = req.params.target; // Usually the nodes parent ID.

  Convert.hashMap().then(map => {
    const uid = generateUID();

    const newNode = {
      intent: {
        name: {
          name: `Update Me - ${uid}`,
          uid,
        },
      },
    };

    const original = map[id];
    let leader = original;
    if (leader)
      if (leader.parent) while (leader.parent) leader = map[leader.parent];

    const child = map[original.child];
    if (child) {
      child.previous = uid;
      saveAll.push(child.save());
    }
    newNode.previous = null;
    newNode.next = original.child;
    newNode.parent = original.intent.name.uid;

    original.child = uid;

    saveAll.push(original.save());

    const addNewNode = new DialogSchema(newNode);

    saveAll.push(addNewNode.save());

    map[uid] = addNewNode;

    Promise.all(saveAll)
      .then(() => {
        Convert.getParent(leader.intent.name.uid).then(data => {
          res.send(data);
        });
      })
      .catch(err => {
        debug(err);
        res.sendStatus(500).send('Unable to add node');
      });
  });
}

function addNew(req, res) {
  Convert.hashMap().then(map => {
    const uid = generateUID(); // Generate  new ID
    const saveAll = [];
    const newNode = {
      intent: {
        name: {
          name: req.body.name ? req.body.name : `Update Me - ${uid}`,
          uid,
        },
      },
    };

    if (!isEmpty(map)) {
      let lastNode = map[Object.keys(map)[0]];
      if (lastNode.parent)
        while (lastNode.parent) lastNode = map[lastNode.parent]; // Get the head of the family.
      if (lastNode.next) while (lastNode.next) lastNode = map[lastNode.next]; // Navigate to the bottom of existing nodes.
      newNode.previous = lastNode.intent.name.uid;
      if (lastNode.next) {
        debug('Adding new node next to wrong node');
      }
      lastNode.next = uid;
      saveAll.push(lastNode.save());
    }

    const addNewNode = new DialogSchema(newNode);

    map[uid] = addNewNode;

    saveAll.push(addNewNode.save());

    Promise.all(saveAll)
      .then(() => {
        res.send(uid);
      })
      .catch(err => {
        debug(err);
        res.sendStatus(500).send('Unable to add new node');
      });
  });
}

const add = (req, res) => {
  if (req.params.target) {
    addToExisting(req, res);
  } else {
    addNew(req, res);
  }
};

module.exports = add;
