class EntityController {
  constructor(log, entityService, httpStatus) {
    this.log = log;
    this.entityService = entityService;
    this.httpStatus = httpStatus;
  }

  async index(req, res) {
    try {
      const result = await this.entityService.listAllEntities();
      res.send(result);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
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
      const updatedEntity = await this.entityService.updateEntity(id, body);
      res.send(updatedEntity);
    } catch (err) {
      this.log.error(err._message);
      res.send(err);
    }
  }
}

module.exports = EntityController;
