const NodeCache = require('node-cache');

class Cache {
  constructor(ttlSeconds = 60 * 60 * 24) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  set(key, data) {
    this.cache.set(key, data);
  }
  get(key) {
    return this.cache.get(key);
  }

  del(keys) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.flushAll();
  }
}

module.exports = Cache;
