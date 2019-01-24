/* eslint-disable no-param-reassign,no-underscore-dangle */
const SlotFiller = require('./SlotFiller');
const { fireWebhook } = require('./webhook');
const safeEval = require('safe-eval');
const _ = require('lodash');

class TraverseNodes {
  constructor(flow, message, session, options) {
    this.max_failure_count = options.max ? options.max : 500000;
    this.options = options;
    this.flow = flow;
    this.message = message;
    this.session = session;
    this.jumps = {};
    this.slotFiller = new SlotFiller(this.session);
    this.toReply = [];
    this.analyticReplies = [];
    this.i = 0;
    this.webhook = false;
  }

  getReplies() {
    return this.toReply;
  }

  getAnalytics() {
    return this.analyticReplies;
  }

  formatReply(reply) {
    return { type: 'bot', text: reply };
  }

  start() {
    return new Promise(resolve => {
      if (this.smallTalk()) {
        resolve();
        return;
      }

      this.navigateFlow();

      this.doJumpTo();

      if (this.webhook) {
        this.doFireWebhook(resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * If not in a conversation.
   *  If has smallTalk cache (no AJAX)
   *    If match
   *      Reply with small talk
   * @returns {boolean}
   */
  smallTalk() {
    // TODO implement new small Talk.
    return false;
  }

  navigateFlow() {
    let foundNode = false;
    for (this.i = 0; this.i < this.flow.length; this.i += 1) {
      const node = this.flow[this.i];

      /** Do Intent */
      if (this.beingJumpedTo(node) || this.validIntent(node)) {
        const slotPrompt = this.slotFiller.slotsCorrect(node, this.message);
        if (slotPrompt) {
          this.toReply.push(this.formatReply(slotPrompt));
          return;
        }

        /** Set the context */
        this.session.context = node.recognises
          ? node.recognises.condition
          : `jump_${node.name.uid}`;

        if (!_.eq(_.last(this.session.path), node.name.uid))
          this.session.path.push(node.name.uid);

        if (this.session.saveNext) {
          this.session.entities.saved[
            this.session.saveNext
          ] = this.message.text;
          this.session.saveNext = null;
        }

        if (node.save) {
          if (!node.save.condition || safeEval(node.node.save.condition)) {
            this.session.saveNext = node.save.name;
          }
        }

        this.addBotReplies(node);

        this.jumps.location = node.jump ? node.jump.to : null;
        this.jumps.condition = node.jump ? node.jump.condition : null;

        if (
          node.analytics &&
          node.analytics.set_intent &&
          (node.recognises.condition &&
            node.recognises.condition.toLowerCase() === '#yes')
        )
          this.session.failedGuesses = 0;

        if (node.webhook.enabled) this.webhook = node.webhook;

        foundNode = true;

        break;
      }
    }
    if (!this.isConfident() && !foundNode) {
      this.toReply.push(
        this.formatReply(
          'Sorry, I do not understand. Can you provide a bit more detail please?',
        ),
      );
    } else if (!foundNode) {
      // If previous question required response.  Repeat previous question if enabled.
      const pr = this.session.previousQuestion;
      if (pr && _.find(this.flow, { uid: pr.uid })) {
        this.toReply.push(this.formatReply(pr.reply));
      } else {
        this.toReply.push(this.formatReply("Sorry I don't understand."));
      }
    }
  }

  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  addBotReplies(node) {
    const actualResponses = [];

    for (let i = 0; i < node.responses.length; i += 1) {
      const reply = node.responses[i];

      if (!reply.condition || !!safeEval(reply.condition)) {
        let output = _.sample(reply.output);

        const sessionEntities = this.session.entities.saved;

        if (sessionEntities) {
          _.forEach(sessionEntities, (data, key) => {
            const { value } = data;
            const replace = this.escapeRegExp(key);
            output = _.replace(output, new RegExp(replace, 'g'), value);
          });
        }

        let qkr = !node.responses[i + 1] ? node.quick_replies : null;
        if (qkr) {
          if (qkr.length === 0) {
            qkr = null;
          } else {
            qkr.forEach(q => {
              delete q._id;
              q.payload = q.title;
            });
          }
        }
        actualResponses.push({
          output,
          quick_replies: qkr,
        });
        this.toReply.push({
          text: output,
          quick_replies: qkr,
        });
      }
    }

    this.analyticReplies.push({
      responses: node.responses,
      actual_responses: actualResponses,
      analytics: node.analytics,
      prevContext: this.session.previousContext,
      max_failure_count: this.max_failure_count,
    });

    if (node.child) {
      this.session.previousQuestion = {
        uid: node.name.uid,
        reply: _.last(this.toReply),
      };
    } else {
      this.session.previousQuestion = null;
    }
  }

  validIntent(node) {
    let valid = false;

    if (
      node.recognises.isJumpedTo ||
      !(this.jumps.location == null || this.jumps.location.length === 0)
    )
      return false; // Jump to is set so we should not check if it is valid here.

    if (node.slotID) return false; // If it is an intent (not a slot)

    if (TraverseNodes.regexText(node, this.message.text)) {
      valid = true; // If matches regex.
    } else if (!this.isConfident()) {
      valid = false;
    } else {
      valid = this.validateCondition(node, this.message); // validate complex conditions like #intent AND @device
    }

    if (valid) {
      return this.validChild(node);
    }
    return false;
  }

  /**
   * Checks to make sure parent node has been fired before a child node can be fired.
   *
   * @param node
   * @returns {boolean}
   */
  validChild(node) {
    const s = `${node.name.uid}_${node.name.name}`;
    if (node.parent !== null && node.parent !== undefined) {
      /** If not a top node */
      const p = this.session.path;
      if (
        this.beingJumpedTo(node) ||
        (_.eq(p[p.length - 1], node.parent) ||
          _.eq(p[p.length - 2], node.parent))
      ) {
        /** if parent was last one fired. Or second last. */
        return true;
      }
      return false;
    }
    /** Push node to previous context, only if not already done. */
    if (_.last(_.last(this.session.previousContext)) !== s) {
      if (!this.session.previousContext) this.session.previousContext = [];
      this.session.previousContext.push([s]);
    }
    return true;
  }

  validateCondition(node) {
    let newString = false;
    if (node.recognises.condition) {
      newString = _.clone(node.recognises.condition);
      const array = node.recognises.condition.split(/ and | or /);

      array.forEach(condition => {
        let valid = false;
        condition = _.trim(condition);

        if (_.eq(condition, this.message.intent.name)) {
          valid = true;
        } else {
          valid = _.some(this.message.entities, entity =>
            _.eq(entity.entity, condition),
          );
        }

        newString = _.replace(newString, condition, valid);
      });

      newString = _.replace(newString, new RegExp('and', 'g'), '&&');
      newString = _.replace(newString, new RegExp('or', 'g'), '||');
    }
    const final = safeEval(newString);
    return final;
  }

  static regexText(node, text) {
    if (!text) return false;
    if (node.recognises.regex) {
      let regex;
      if (node.recognises.regexFlags) {
        regex = new RegExp(node.recognises.regex, node.recognises.regexFlags);
      } else {
        regex = new RegExp(node.recognises.regex);
      }

      if (_.isRegExp(regex)) {
        if (regex.test(text)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks if node.jumpedTo === this.jumps.location
   *
   * @param node
   * @returns {boolean}
   */
  beingJumpedTo(node) {
    if (
      node.name &&
      this.jumps.location &&
      this.jumps.location === node.name.uid
    ) {
      if (this.jumps.location === node.name.uid) {
        return true;
      }
    }
    return false;
  }

  /**
   * If the webhook makes us jump to a node. Fire that node.
   * @param id
   * @param resolve
   */
  webHookJumpTo(id, resolve) {
    this.jumps.location = id;
    this.webhook = false;
    if (this.jumps.location) {
      this.start().then(() => {
        resolve();
      });
    } else {
      resolve();
    }
  }

  doFireWebhook(resolve) {
    fireWebhook(this.session, this.webhook)
      .then(() => {
        this.webHookJumpTo(this.webhook.success, resolve);
      })
      .catch(() => {
        this.webHookJumpTo(this.webhook.failure, resolve);
      });
  }

  /**
   * If a node sets a jump to, recursively navigate the flow
   */
  doJumpTo() {
    while (this.jumps.location) {
      if (!this.jumps.condition || safeEval(this.jumps.condition)) {
        const temp = this.jumps.location;
        this.navigateFlow();
        this.jumps.location =
          temp === this.jumps.location ? null : this.jumps.location;
      } else {
        this.jumps.location = null;
      }
    }
  }

  /**
   * Called to check if the intent in confident
   *
   * @param message
   */
  isConfident() {
    if (this.message) {
      if (this.message.intent_ranking) {
        const confidence1 = this.message.intent_ranking[0].confidence;
        const confidence2 = 1.5 * this.message.intent_ranking[1].confidence;

        if (confidence1 > confidence2) {
          return true;
        }
      }
    }
    return false;
  }
}

module.exports = TraverseNodes;
