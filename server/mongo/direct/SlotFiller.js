/* eslint-disable no-underscore-dangle,consistent-return */
const _ = require('lodash');

class SlotFiller {
  constructor(session) {
    this.session = session;
  }

  slotsCorrect(node, message) {
    if (node.slots) {
      node.slots.forEach(reqSlot => {
        const entity = _.find(message.entities, { entity: reqSlot.entity });
        if (entity) {
          this.session._doc.entities.saved[`${reqSlot.slotID}`] = {
            value: entity.value,
            ruid: message.ruid,
          };
        } else {
          // Slot not filled.
          if (reqSlot.required) {
            return reqSlot.prompt;
          }
          this.session._doc.entities.saved[`${reqSlot.slotID}`] = {
            value: reqSlot.defaultValue,
            ruid: message.ruid,
          };
        }
      });
    }
    return false;
  }

  /**
   * Given a node and the entities in the message.
   *  - If it's filled return true,
   *  - If it's not filled,
   *      - See if it can be filled, if it can return true
   *      - If not
   *          - Check if it is even required, if it not set the default value
   *          - Send the prompt
   * @param node
   * @param entities
   * @returns {*}
   */
  work(node, entities) {
    if (this.ifSlotFilled(node.entity)) {
      return {
        filled: true,
      };
    }
    if (this.attemptFillSlot(entities, node)) {
      return {
        filled: true,
      };
    }
    if (!node.required) {
      this.fillSlot(node, {
        entity: node.entity,
        value: node.defaultPrompt,
      });
      return {
        filled: true,
      };
    }
    return {
      filled: false,
      prompt: node.prompt,
    };
  }

  /**
   *
   * @param context
   * @param entity
   * @returns {boolean}
   */
  ifSlotFilled(entity) {
    if (!this.session.entities) {
      this.session.entities = {
        context: {},
        saved: {},
      };
    }
    if (this.session.context in this.session.entities.context) {
      if (entity in this.session.entities.context[this.session.context]) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param messageEntities[] - Comes from message, can be multiple
   * @param slotEntity - Single entity requested in slot
   */
  attemptFillSlot(messageEntities, slotNode) {
    messageEntities.entities.forEach(entityobj => {
      if (entityobj.entity === slotNode.entity) {
        this.fillSlot(slotNode, entityobj);
        return true;
      }
    });
    return false;
  }

  /**
   * Slot is already filled, check if new message with updated entity
   * @param newEntities
   */
  refillSlot(newEntities, node) {
    Object.keys(this.session.entities.context).forEach(key => {
      if (key === node.condition) {
        newEntities.entities.forEach(singleEntity => {
          this.session.entities.context[key][singleEntity.entity] =
            singleEntity.value;
        });
      }
    });
  }

  /**
   * Add the entity to the session's context
   * @param entityInMessage
   */
  fillSlot(node, entityInMessage) {
    const { entities } = this.session;
    const { context } = entities;
    const sessionContext = this.session.context;

    if (context[sessionContext] === undefined) context[sessionContext] = {};
    context[sessionContext][entityInMessage.entity] = entityInMessage.value;
    entities.saved[node.slotID] = entityInMessage.value;
  }
}

module.exports = SlotFiller;
