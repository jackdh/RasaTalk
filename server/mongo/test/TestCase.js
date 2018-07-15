/* eslint-disable no-param-reassign */
const _ = require('lodash');
const RandExp = require('randexp');

// eslint-disable-next-line import/no-unresolved
const dialog = require('../controllers/dialog');
const Convert = require('../controllers/utils/converstions');
// eslint-disable-next-line import/no-unresolved
const expressions = require('../../db/expressions');

let self;
global.getAllCache = {};

class TestCase {
  constructor(map, simple, jumpToEnabled) {
    this.map = map;
    this.delimeter = '>';
    this.simple = simple; // Will return a simple list.
    this.jumpToEnabled = jumpToEnabled;
    self = this;
  }

  /**
   * Given a parent node it will return a test case for ever possible path.
   *
   * @param startNode
   * @returns {Promise}
   */
  getSingleTestCase(startNode, jump) {
    return new Promise(resolve => {
      startNode.next = null;
      // We don't care about the parents sibling.
      const totalPaths = recurseParent(this.map, startNode, [], []);

      const allPaths = [];
      totalPaths.forEach(singlePath => {
        allPaths.push(this.getQaR(singlePath, jump));
      });

      Promise.all(allPaths).then(data => {
        resolve(data);
      });
    });
  }

  /**
   * Given a path, it will return the test case for it.
   *
   * @param singlePath
   * @param jump
   * @returns {Promise}
   */
  getQaR(singlePath) {
    return new Promise(resolve => {
      const list = TestCase.buildListOfConditions(singlePath);
      Promise.all(list).then(values => {
        const flow = [];
        const { nodes } = singlePath;
        for (let i = 0; i < nodes.length; i += 1) {
          if (i !== 0 && values[i] === '') {
            const simple = TestCase.getSimpleResponses(
              nodes[i].intent.responses,
            );
            flow[flow.length - 1].response = flow[
              flow.length - 1
            ].response.concat(simple);
          } else {
            flow.push(TestCase.buildNodeScript(nodes[i].intent, values[i]));
          }
        }
        if (self.simple) {
          resolve(singlePath.name);
        } else {
          flow[flow.length - 1].final = true;
          resolve({
            name: singlePath.name,
            flow,
          });
        }
      });
    });
  }

  /**
   * Given a intent. It will match a question which triggers that intent and a response to that question.
   * If buttons are present it will add them.
   * @param intent
   * @param request
   * @returns {{request: *, response: *}}
   */
  static buildNodeScript(intent, request) {
    const temp = {
      request,
      response: this.getSimpleResponses(intent.responses),
    };
    const quickReplies = intent.quick_replies;
    if (quickReplies.buttons.length > 0)
      temp.quick_replies = this.getSimpleQuickReplies(quickReplies.buttons);
    if (intent.jumpTo) temp.jumpTo = intent.jumpTo;
    return temp;
  }

  /**
   * Takes button objects and returns the list of buttons
   *
   */
  static getSimpleQuickReplies(buttons) {
    const temp = [];
    buttons.forEach(button => {
      temp.push(button.title);
    });
    return temp;
  }

  /**
   * Converts response objects into a simple list of responses.
   * @param responses
   */
  static getSimpleResponses(responses) {
    const temp = [];
    responses.forEach(resp => {
      temp.push(resp.output);
    });
    return temp;
  }

  /**
   * Given a path it will return the array of questions which need to be asked to fire that condition or regex.
   * @param singlePath
   * @returns {Array}
   */
  static buildListOfConditions(singlePath) {
    const list = [];
    singlePath.nodes.forEach(node => {
      if (node.intent.regex) {
        const randExp = this.generateRegex(node);
        list.push(randExp); // let randExp = RandExp(node.intent.regex);
        // list.push(node.intent.regex);
      } else {
        list.push(
          expressions.getRandomExpressionByIntentNameLocal(
            node.intent.condition,
          ),
        );
      }
    });
    return list;
  }

  static generateRegex(node) {
    const reg = node.intent.regex;
    if (_.eq(reg, '(.*?)')) {
      return new RandExp('Random [a-zA-Z]{5,20}').gen();
    }
    return new RandExp(node.intent.regex).gen();
  }
}

/**
 *
 * Recursive method which builds a list of paths down a node.
 * Should a node have a jumpTo in it it will jump to that node and traverse it.
 * However it will not jump to a previously jumped to node.
 * @param map
 * @param node
 * @param path
 * @param total
 * @returns {*}
 */
function recurseParent(map, node, path, total) {
  path.push(node);
  if (node.child) {
    const child = map[node.child].toObject();
    let next = null;
    if (child.next) next = map[child.next].toObject();
    while (next) {
      recurseParent(map, next, _.clone(path), total);
      next = map[next.next];
    }
    recurseParent(map, child, _.clone(path), total);
  } else if (
    node.intent.jumpTo &&
    self.jumpToEnabled &&
    !path.find(o => o.intent.name.uid === node.intent.jumpTo)
  ) {
    recurseParent(
      map,
      map[node.intent.jumpTo].toObject(),
      _.clone(path),
      total,
    );
  } else {
    total = addToTotal(path, total);
  }
  return total;
}

/**
 * Given a path of nodes. It will create a path of them and add them to the total.
 *
 * @param path
 * @param total
 * @returns {*}
 */
function addToTotal(path, total) {
  let pathString = '';
  path.forEach(node => {
    pathString += node.intent.name.name + self.delimeter;
  });
  total.push({
    name: pathString.substring(0, pathString.length - 1),
    questionAndResponse: {},
    nodes: path,
  });
  return total;
}

function generateCase(req, res) {
  Convert.hashMap().then(map => {
    dialog()
      .getSingle(req.params.id)
      .then(node => {
        const testCase = new TestCase(map);
        testCase.getSingleTestCase(node.toObject()).then(singleTestCase => {
          res.send(singleTestCase);
        });
      });
  });
}

/**
 * Will return test cases for all the parents.
 * @param req
 * @param res
 */
function generateAll(req, res) {
  if (!_.isEmpty(global.getAllCache)) {
    res.send(global.getAllCache);
  }
  const all = [];
  const simple = req.params.simple === 'true';
  const jumpToEnabled = req.params.jumpToEnabled === 'true';
  dialog()
    .getParentsInternal()
    .then(data => {
      Convert.hashMap().then(map => {
        dialog()
          .getMulti(data)
          .then(nodes => {
            nodes.forEach(node => {
              all.push(
                new TestCase(map, simple, jumpToEnabled).getSingleTestCase(
                  node.toObject(),
                ),
              );
            });
            Promise.all(all).then(d => {
              global.getAllCache = d;
              res.send(d);
            });
          });
      });
    });
}

module.exports = {
  generateCase,
  generateAll,
};
