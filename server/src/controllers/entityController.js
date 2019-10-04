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
  const entity = new Entity(
    req.body,
  );
  await entity.save((err, savedEntity) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(savedEntity);
    }
  });
};

exports.show = async (req, res) => {
  const entity = await Entity.findOne({
    _id: req.params.id,
  }, (err, foundEntity) => foundEntity);
  (entity) ? res.send(entity) : res.send('Resource not found');
};

exports.delete = async (req, res) => {
  Entity.deleteOne({
    _id: req.params.id,
  }, (err) => {
    if (err) {
      res.send('Resource not found');
    } else {
      res.send('Deleted successfully');
    }
  });
};

exports.update = async (req, res) => {
  await Entity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }, (err, updatedEntity) => {
    if (err) {
      res.send(err._message);
    } else {
      res.send(updatedEntity);
    }
  });
};
