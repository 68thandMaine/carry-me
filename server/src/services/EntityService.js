class EntityService {
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  async createEntity(body) {
    const Entity = this.mongoose.model('Entity');
    const { entityName } = body;
    const entity = await Entity.findOne({ entityName });

    if (entity) {
      const err = new this.errs.InvalidArgumentError(
        'Entity with this entityname already exisits.',
      );
      return err;
    }

    let newEntity = new Entity(body);
    newEntity = await newEntity.save();
    this.log.info('Entity created successfully.');
    return newEntity;
  }

  async getEntityById(entityId) {
    const Entity = this.mongoose.model('Entity');
    const entity = await Entity.findOne({ _id: entityId });

    if (!entity) {
      const err = new this.errs.NotFoundError(`Entity with id - ${entityId} does not exist.`);
      return err;
    }

    this.log.info('Entity fetched successfully.');
    return entity;
  }

  async deleteEntity(entityId) {
    const Entity = this.mongoose.model('Entity');
    const entity = await Entity.deleteOne({ _id: entityId });

    if (!entity) {
      const err = new this.errs.NotFoundError(`Entity with id ${entityId} does not exist.`);
      return err;
    }
    this.log.info('Entity deleted successfullly');
    return entity;
  }

  async updateEntity(id, body) {
    const Entity = this.mongoose.model('Entity');
    const entity = await Entity.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if(!entity) {
      const err = new this.errs.NotFoundError(`Entity with id ${id} could not be updated.`);
      return err;
    }
    this.log.info('Entity successfully updated');
    return entity;
  }
}
