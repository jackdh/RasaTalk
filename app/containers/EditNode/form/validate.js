const _ = require('lodash');

export const validate = valuesParam => {
  const values = valuesParam.toJS();

  const errors = {};

  if (!_.get(values, 'name.name')) {
    _.set(errors, 'name.name', 'Required');
  }

  if (
    !_.get(values, 'recognises.condition') &&
    !_.get(values, 'recognises.regex') &&
    !_.get(values, 'recognises.isJumpedTo')
  ) {
    _.set(errors, 'recognises.condition', 'Pick One');
    _.set(errors, 'recognises.regex', 'Pick One');
  }

  if (_.get(values, 'slots')) {
    values.slots.map((slot, index) => {
      if (!_.trim(slot.entity)) {
        _.set(errors, `slots.${index}.entity`, 'Required');
      }
      if (!_.trim(slot.slotID)) {
        _.set(errors, `slots.${index}.slotID`, 'Required');
      }

      if (_.get(slot, 'required')) {
        if (!_.trim(slot.prompt)) {
          _.set(errors, `slots.${index}.prompt`, 'Required');
        }
      } else if (!_.trim(slot.defaultValue)) {
        _.set(errors, `slots.${index}.defaultValue`, 'Required');
      }
      return null;
    });
  }

  if (_.get(values, 'responses')) {
    values.responses.map((resp, index) => {
      if (resp.output) {
        resp.output.map((output, oIndex) => {
          if (!_.trim(output)) {
            return _.set(
              errors,
              `responses.${index}.output.${oIndex}`,
              'Required',
            );
          }
          return null;
        });
      }
      return null;
    });
  }

  if (_.get(values, 'quick_replies')) {
    values.quick_replies.map((qr, index) => {
      if (!_.trim(qr.text)) {
        _.set(errors, `quick_replies.${index}.text`, 'Required');
      }
      return null;
    });
  }

  if (_.get(values, 'webhook.to')) {
    if (_.get(values, 'webhook.to').trim()) {
      if (!_.trim(values.webhook.type)) {
        _.set(errors, 'webhook.type', 'Required');
      }
      if (!IsJsonString(values.webhook.body)) {
        _.set(errors, 'webhook.body', 'Invalid JSON');
      }
    }
  }

  if (_.get(values, 'webhook.variables')) {
    values.webhook.variables.map((variable, index) => {
      if (!_.trim(variable.path)) {
        _.set(errors, `webhook.variables.${index}.path`, 'Required');
      }
      if (!_.trim(variable.as)) {
        _.set(errors, `webhook.variables.${index}.as`, 'Required');
      }
      return null;
    });
  }

  return errors;
};

function IsJsonString(str) {
  if (!_.isEmpty(str)) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
  }
  return true;
}

export default validate;
