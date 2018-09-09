const mongoose = require('../mongo/schemas/chatbot_db_connect');
/**
 * botkit-storage-mongo - MongoDB driver for Botkit
 *
 */
module.exports = () => {
  const storage = {};

  const tables = ['teams', 'channels', 'users'];

  tables.forEach(zone => {
    storage[zone] = getStorage(
      `botkit${zone.charAt(0).toUpperCase() + zone.slice(1)}`,
    );
  });

  return storage;
};

const getTable = zone => mongoose.connection.db.collection(zone);

/**
 * Creates a storage object for a given "zone", i.e, teams, channels, or users
 *
 * @param {String} zone The table to query in the database
 * @returns {{get: get, save: save, all: all, find: find}}
 */
function getStorage(zone) {
  return {
    get: (id, cb) => getTable(zone).findOne({ id }, cb),
    save: (data, cb) =>
      getTable(zone).findOneAndUpdate(
        {
          id: data.id,
        },
        data,
        {
          upsert: true,
          returnNewDocument: true,
        },
        cb,
      ),
    all: cb => getTable(zone).find({}, cb),
    find: (data, cb) => getTable(zone).find(data, cb),
    delete: (id, cb) => getTable(zone).findOneAndDelete({ id }, cb),
  };
}
