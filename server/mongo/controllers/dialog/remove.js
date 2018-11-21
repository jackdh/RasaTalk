/* eslint-disable no-param-reassign */
const Convert = require('../converstions');

function remove(req, res) {
  const { talkWrapper } = req.params;
  Convert.hashMap(talkWrapper).then(map => {
    const uid = req.params.target;
    const saveAll = [];
    const node = map[uid];
    let leader = node;
    if (leader)
      if (leader.parent) while (leader.parent) leader = map[leader.parent];

    if (node.parent && node.previous === null) {
      const parent = map[node.parent];
      parent.child = node.next;
      saveAll.push(parent.save());
    }

    if (node.previous) {
      const previous = map[node.previous];
      previous.next = node.next;
      saveAll.push(previous.save());
    }

    if (node.next) {
      const next = map[node.next];
      next.previous = node.previous;
      saveAll.push(next.save());
    }

    const child = map[node.child];
    if (node.child) {
      const all = deleteChildren(child, map, []);
      saveAll.concat(all);
    }

    saveAll.push(node.remove());
    delete map[node.intent.name.uid];
    Promise.all(saveAll).then(() => {
      if (leader) {
        Convert.getParent(talkWrapper, leader.intent.name.uid).then(data => {
          res.send(data);
        });
      } else {
        res.send(200);
      }
    });
  });
}

function deleteChildren(node, map, all) {
  if (node.child) {
    deleteChildren(map[node.child], map, all);
  }
  if (node.next) {
    deleteChildren(map[node.next], map, all);
  }
  all.push(node.remove());
}

module.exports = remove;
