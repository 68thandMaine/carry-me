const Entity = require('../models/Entity.model');

exports.index = (req, res) => {
  Entity.find().exec((err, entities) => {
    if (err) {
      res.send("This doesn't exist");
    } else {
      res.send(entities);
    }
  });
};

exports.create = async (req, res) => {
  const { entityName, email, password } = req.body;
  const entity = new Entity({
    entityName,
    email,
    password,
  });
  entity.save((err, savedEntity) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(savedEntity);
    }
  });
};

exports.show = async (req, res) => {
  const entity = await Entity.findOne({
    _id: req.params.id
  }, (err, entity) => entity );
  (entity) ? res.send(entity) : res.send('Resource not found');
};

exports.delete = async (req, res) => {
  Entity.deleteOne({
    _id: req.params.id,
  }, (err) => {
    if(err) {
      res.send('Resource not found');
    } else {
      res.send('Deleted successfully');
    }
  });
};
