/* eslint-disable no-underscore-dangle,no-param-reassign */
const IntentSchema = require('../schemas/intentsSchema');
const EntitiesSchema = require('../schemas/entitiesSchema');
const ExpressionSchema = require('../schemas/expressionsSchema');
const TrainingSchema = require('../schemas/trainingSchema');
const axios = require('axios');
const moment = require('moment');

const _ = require('lodash');
const debug = require('debug')('Training');

class Generate {
  constructor(agent, entities) {
    this.agent = agent;
    this.entities = entities;

    this.intents = agent.intents;
    this.finalised = [];
    this.regexs = [];

    this.reg = /¬.+?(?=|)\|.+?(?=)¬/g;
    this.wrapper = '¬';

    this.intent = {};
    this.expression = {};

    this.totalIntents = 0;
    this.totalExpressions = 0;

    this.error = '';
  }

  getAll() {
    return {
      common_examples: this.finalised,
      regex_features: this.regexs,
    };
  }

  work() {
    this.intents.forEach(intent => {
      this.totalIntents += 1;
      intent.expressions.forEach(expression => {
        this.totalExpressions += 1;

        this.intent = intent;
        this.expression = expression;
        if (this.expression.entities.length === 0) {
          this.addToFinal({
            intent: intent.name,
            text: this.expression.value,
            entities: [],
          });
        } else {
          this.expression.entities = _.sortBy(this.expression.entities, [
            'start',
          ]); // TODO move this to mongo / mongoose.
          this.expression = this.addStringVariables(this.expression); // Convert the this.expression to include the type of entity.
          this.addToFinal(this.insertEntities(expression)); // TODO speed up the concat
        }
      });
      if (intent.regex) {
        intent.regex.forEach(regex => {
          this.regexs.push({
            name: intent.name,
            pattern: regex,
          });
        });
      }
    });
    debug('Training');
    debug('Intents, ', this.totalIntents);
    debug('Entities, ', this.totalExpressions);
  }

  addToFinal(add) {
    if (Array.isArray(add)) {
      this.finalised = this.finalised.concat(add);
    } else {
      this.finalised.push(add);
    }
  }

  addStringVariables(expression) {
    const skipped = 0;
    let shifted = 0;
    for (let i = 0; i < expression.entities.length; i += 1) {
      const entity = expression.entities[i];
      const shift = i * 2 - skipped * 2 + shifted;
      shifted += `${entity.entity}|`.length;
      entity.start += shift;
      entity.end += shift + 1 + `${entity.entity}|`.length;
      expression.value = [
        expression.value.slice(0, entity.start),
        `${this.wrapper + entity.entity}|`,
        expression.value.slice(entity.start),
      ].join('');
      expression.value = [
        expression.value.slice(0, entity.end),
        this.wrapper,
        expression.value.slice(entity.end),
      ].join('');
    }
    return expression;
  }

  // noinspection JSMethodCanBeStatic
  insertEntities(expression) {
    const list = [];
    list.push({
      intent: this.intent.name,
      text: expression.value,
      entities: [],
    });
    const matches = expression.value.match(this.reg);
    matches.forEach(match => {
      const split = match.split('|');
      const entityValue = split[1].slice(0, -1);
      const entityName = split[0].substr(1);

      const synonyms = this.getSynonyms(entityName, entityValue);

      for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        if (item.text.indexOf(match) !== -1) {
          const backup = _.clone(item);
          let start = backup.text.indexOf(match);
          let end = start + entityValue.length;

          list[i].text = _.replace(item.text, match, entityValue);
          list[i].entities.push({
            start,
            end,
            value: entityValue,
            entity: entityName,
          });

          expression = _.replace(item.text, match, entityValue);
          synonyms.forEach(synonym => {
            const tempEnts = _.clone(backup.entities);
            tempEnts.pop();
            start = backup.text.indexOf(match);
            end = start + synonym.length;
            tempEnts.push({
              start,
              end,
              value: entityValue,
              entity: entityName,
            });
            list.push({
              text: _.replace(backup.text, match, synonym),
              intent: backup.intent,
              entities: tempEnts,
            });
          });
        }
      }
    });
    return list;
  }

  hasError() {
    return this.error;
  }

  getSynonyms(name, reference) {
    const savedEntity = _.find(this.entities, { name });
    if (!savedEntity) {
      this.error += `Missing entity: ${reference} in entities`;
      return [];
    }
    const synonymObject = _.find(savedEntity.synonyms, {
      synonym_reference: reference,
    });
    return synonymObject ? synonymObject.list : [];
  }
}

function generateJSON(req, res) {
  const { agent } = req.params;
  if (agent === 'null') {
    res.sendStatus(400);
    return;
  }

  IntentSchema.findOne({ agent })
    .lean()
    .exec()
    .then(gAgent => {
      ExpressionSchema.find({})
        .lean()
        .exec()
        .then(expressions => {
          for (let i = 0; i < gAgent.intents.length; i += 1) {
            gAgent.intents[i].expressions = expressions.filter(expression =>
              expression.intent.equals(gAgent.intents[i]._id),
            );
          }

          EntitiesSchema.find({})
            .lean()
            .exec((entErr, entities) => {
              if (entErr) {
                debug(entErr);
                res.sendStatus(500);
              } else {
                const work = new Generate(gAgent, entities);
                work.work();
                if (work.hasError()) {
                  res.status(401).send(work.hasError());
                } else {
                  const all = { rasa_nlu_data: work.getAll() };
                  TrainingSchema.create({ agent, data: all }).then(training => {
                    res.send(training);
                  });
                }
              }
            });
        });
    })
    .catch(genIntSchErr => {
      debug(genIntSchErr);
      res.res
        .status(475)
        .send('Something went wrong on that back end, please check the logs.');
    });
}

function getTraining(req, res) {
  TrainingSchema.find({}, '-data')
    .then(models => {
      res.send(models);
    })
    .catch(() =>
      res
        .status(475)
        .send("It looks likes that ID doesn't exist, please try re-generating"),
    );
}

function getJSON(req, res) {
  const { _id } = req.body;
  TrainingSchema.findOne({ _id })
    .then(models => {
      res.send(models);
    })
    .catch(() =>
      res
        .status(475)
        .send("It looks likes that ID doesn't exist, please try re-generating"),
    );
}

function train(req, res) {
  const { _id } = req.body;
  TrainingSchema.findOne({ _id })
    .then(model => {
      if (model) {
        const start = moment();
        axios
          .post(
            `${process.env.RASASERVER}/train?project=${model.agent}`,
            model.data,
          )
          .then(result => {
            if (_.startsWith(result.data.info, 'new model trained: ')) {
              const end = moment();
              const duration = end.diff(start);
              const timeDuration = moment.utc(duration).format('HH:mm:ss');
              model.model = _.last(result.data.info.split(' '));
              model.timeTaken = timeDuration;
              model.save().then(m => {
                delete m.data;
                return res.send(m);
              });
            }
          })
          .catch(error =>
            res
              .status(error.response.status)
              .statusText(error.response.data.error),
          );
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      debug(error);
      res
        .status(401)
        .send('Something went wrong on the backend. Please check the logs');
    });
}

function status(req, res) {
  axios
    .get(`${process.env.RASASERVER}/status`)
    .then(s => {
      res.send(s.data);
    })
    .catch(error => {
      debug(error);
      res
        .status(401)
        .send('Something went wrong on the backend. Please check the logs');
    });
}

function parse(req, res) {
  parseInteral(req.body)
    .then(p => {
      res.send(p.data);
    })
    .catch(error => {
      debug(error);
      res
        .status(401)
        .send('Something went wrong on the backend. Please check the logs');
    });
}
const parseInteral = message =>
  axios.post(`${process.env.RASASERVER}/parse`, message);

module.exports = {
  parse,
  train,
  status,
  getJSON,
  getTraining,
  parseInteral,
  generateJSON,
};
