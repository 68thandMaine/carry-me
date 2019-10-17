const Entity = require('../models/Entity.model');


class EntityController {
  constructor(log, entityService, httpStatus) {
    this.log = log;
    this.entityService = entityService;
    this.httpStatus = httpStatus;
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.entityService.createEntity(body);
      res.send(result);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const foundEntity = await this.entityService.getEntityById(id);
      res.send(foundEntity);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.entityService.deleteEntity(id);
      res.send(deleted);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedEntity = await this.entityService.update(id, body);
      res.send(updatedEntity);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
  }
}

module.exports = EntityController;

// exports.index = (req, res) => {
//   Entity.find().exec((err, entities) => {
//     if (err) {
//       res.send("This doesn't exist");
//     } else {
//       res.send(entities);
//     }
//   });
// };

// exports.create = async (req, res) => {
//   const entity = new Entity(
//     req.body,
//   );
//   await entity.save((err, savedEntity) => {
//     if (err) {
//       res.send(err._message);
//     } else {
//       res.send(savedEntity);
//     }
//   });
// };

// exports.show = async (req, res) => {
//   const entity = await Entity.findOne({
//     _id: req.params.id,
//   }, (err, foundEntity) => foundEntity);
//   (entity) ? res.send(entity) : res.status(404).send('Resource not found');
// };

// exports.delete = async (req, res) => {
//   Entity.deleteOne({
//     _id: req.params.id,
//   }, (err) => {
//     if (err) {
//       res.send('Resource not found');
//     } else {
//       res.send('Deleted successfully');
//     }
//   });
// };

// exports.update = async (req, res) => {
//   await Entity.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   }, (err, updatedEntity) => {
//     if (err) {
//       res.send(err._message);
//     } else {
//       res.send(updatedEntity);
//     }
//   });
// };
