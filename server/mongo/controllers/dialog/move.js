/* eslint-disable prefer-promise-reject-errors,no-param-reassign */
const Convert = require('../utils/converstions');
const myCache = require('../utils/cache');

function moveVertically(uid, map, direction) {
  return new Promise((resolve, reject) => {
    const node = map[uid];

    if (direction === 'down') {
      if (node.next === null) {
        return reject('Invalid down movement');
      }
      return resolve(moveVertically(node.next, map, 'up'));
    } else if (direction === 'up' && node.previous === null) {
      return reject('Invalid up movement');
    } else if (direction !== 'up' && direction !== 'down') {
      return reject('Invalid movement. Can only handle Up/Down');
    }

    const saveAll = [];
    const prev = map[node.previous]; // get the one above

    if (prev.previous) {
      // if there is two above
      const prevPrev = map[prev.previous]; // get the grandparent
      prevPrev.next = uid; // set the grandparent to this node
      saveAll.push(prevPrev.save()); // save the grand parent
    }
    if (prev.parent && prev.previous === null) {
      // if above oldest child
      const parent = map[node.parent]; // get the parent
      parent.child = uid; // set the new oldest child to the uid
      saveAll.push(parent.save()); // save the parent
    }

    if (node.next) {
      const next = map[node.next];
      next.previous = node.previous;
      saveAll.push(next.save());
    }

    prev.next = node.next; // set the above to point below
    node.next = node.previous; // set the node next to above
    node.previous = prev.previous; // set our previous to grandchild (or null)
    prev.previous = uid; // set the above previous to uid
    saveAll.push(node.save(), prev.save());
    myCache.set('mapCache', map);
    return resolve(Promise.all(saveAll));
  });
}

function moveLeft(uid, map) {
  return new Promise((resolve, reject) => {
    const node = map[uid];
    const saveAll = [];
    if (node.parent) {
      const parent = map[node.parent]; // Has to have a parent to move left
      if (node.previous) {
        // fill child chain gap.
        map[node.previous].next = node.next; // set that next to our next
        saveAll.push(map[node.previous].save()); // sae it
      }
      if (node.next) {
        // if we are the head, replace head with next
        parent.child = node.next;
        map[node.next].previous = node.previous;
        saveAll.push(map[node.next].save());
      } else if (!node.next && !node.previous) {
        // We were head, none to replace
        parent.child = null;
      }

      if (parent.next) {
        const next = map[parent.next];
        next.previous = uid;
        saveAll.push(next.save());
      }
      node.parent = parent.parent;
      node.previous = parent.intent.name.uid;
      node.next = parent.next;
      parent.next = uid;
      saveAll.push(node.save(), parent.save());
      myCache.set('mapCache', map);
      resolve(Promise.all(saveAll));
    } else {
      reject('Invalid upwards movement');
    }
  });
}

function moveRight(uid, map) {
  return new Promise((resolve, reject) => {
    const node = map[uid];
    const saveAll = [];
    if (node.previous) {
      let next;
      let lastChild;
      // If the node can be a child of the above
      if (node.next) {
        next = map[node.next];
        next.previous = node.previous; // update the one below to point up
        saveAll.push(next.save());
      }

      const previous = map[node.previous];
      previous.next = node.next;

      node.parent = node.previous;
      node.previous = null;
      node.next = null;

      if (previous.child) {
        lastChild = map[previous.child]; // get last child uid.
        while (lastChild.next) {
          lastChild = map[lastChild.next];
        }
        lastChild.next = node.intent.name.uid;
        node.previous = lastChild.intent.name.uid;
        saveAll.push(lastChild.save());
      } else {
        previous.child = uid;
      }
      saveAll.push(previous.save(), node.save());
      myCache.set('mapCache', map);
      resolve(Promise.all(saveAll));
    } else {
      reject('Invalid right movement');
    }
  });
}

function move(req, res) {
  const { uid, direction, talkWrapper } = req.params;
  Convert.hashMap(talkWrapper).then(map => {
    const promises = [];
    if (direction === 'left') {
      promises.push(moveLeft(uid, map));
    } else if (direction === 'right') {
      promises.push(moveRight(uid, map));
    } else {
      promises.push(moveVertically(uid, map, direction));
    }
    Promise.all(promises)
      .then(() => {
        let leader = map[uid];
        if (leader)
          if (leader.parent) while (leader.parent) leader = map[leader.parent]; // Get the head of the family.
        Convert.getParent(talkWrapper, leader.intent.name.uid).then(family => {
          res.send(family);
        });
      })
      .catch(errMessage => {
        res.status(400).send(errMessage);
      });
  });
}

module.exports = move;
