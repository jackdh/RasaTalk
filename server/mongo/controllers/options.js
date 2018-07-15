const OptionsSchema = require('../schemas/optionsSchema');

function save(req, res) {
  const { name, data } = req.params;
  OptionsSchema.update(
    { name },
    { $set: { 'options.text': data } },
    { upsert: true },
    err => {
      if (err) res.sendStatus(500);

      res.sendStatus(200);
    },
  );
}

function get(req, res) {
  if (req.params.name === 'all') {
    OptionsSchema.find({}, (err, model) => {
      if (err) res.sendStatus(500);

      res.send({ data: model });
    });
  } else {
    OptionsSchema.findOne({ name: req.params.name }, (err, model) => {
      if (err) res.sendStatus(500);

      res.send(model);
    });
  }
}

module.exports = {
  save,
  get,
};
