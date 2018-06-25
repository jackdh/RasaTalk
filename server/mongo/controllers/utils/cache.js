const DialogSchema = require('../../schemas/dialogSchema');
const moment = require('moment');
const cache = require('global-cache');
const Convert = require('./converstions');
const sT = require('../smallTalk');
const debug = require('debug')('cache.js');

function generateCache() {
  return new Promise(resolve => {
    sT.generateServiceSideUsage().then(stAmount => {
      debug('Small Talk');
      if (!cache.has('dialogCache')) {
        debug('dialog has dialog cache');
        return DialogSchema.find().then(model => {
          debug('Email Talk');
          const data = { emails: {}, flow: Convert.convert(model), map: model };
          cache.set('dialogCache', {
            data,
            time: moment.now(),
          });
          return resolve(
            `Updated: ${stAmount} - Dialog Amount: ${
              Object.keys(data.flow).length
            }`,
          );
        });
      }
      return resolve(`Updated: ${stAmount}`);
    });
  });
}

function has(key) {
  return cache.has(key);
}

function set(key, value) {
  return cache.set(key, value);
}

function get(key) {
  return cache.get(key);
}

function resetCache() {
  debug('Resetting cache');
  cache.delete('smallTalkServerSide');
  cache.delete('dialogCache');
  return generateCache();
}

function resetCacheAPI(req, res) {
  debug('Resetting cache API');
  cache.delete('smallTalkServerSide');
  cache.delete('dialogCache');
  if (res) {
    generateCache().then(data => {
      debug('cache reset');
      res.send(data);
    });
  } else {
    return generateCache();
  }
  return true;
}

module.exports = {
  generateCache,
  resetCache,
  resetCacheAPI,
  has,
  set,
  get,
};
