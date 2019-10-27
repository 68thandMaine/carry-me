class EntityService {
  constructor(log, mongoose, httpStatus) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
  }
  
  async listAllEntities() {
    const Entity = this.mongoose.model('Entity');
    const entities = await Entity.find();
    this.log.info(`${entities.length} Entities returned.`);
    return entities;
  }

  async createEntity(body) {
    const Entity = this.mongoose.model('Entity');
    const { entityName } = body;
    const entity = await Entity.findOne({ entityName });
    
    if (entity) {
      return 'Entity with this name already exists.';
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
      this.log.error(`Entity with id: ${entityId} was not found.`);
      return `Entity with id - ${entityId} does not exist in the database.`;
    }
    this.log.info('Entity fetched successfully.');
    return entity;
  }

  async deleteEntity(entityId) {
    const Entity = this.mongoose.model('Entity');
    const entity = await Entity.deleteOne({ _id: entityId });
    if (entity.deletedCount === 0) {
      this.log.error(`Entity with id - ${entityId} does not exist.`);
      return `Entity with id - ${entityId} does not exist.`;
    }
    entity.message = 'Entity deleted successfully.';
    this.log.info(`Entity with id - ${entityId} was deleted successfully.`);
    return entity;
  }

  async updateEntity(id, body) {
    const Entity = this.mongoose.model('Entity');
    const entity = await Entity.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!entity) {
      return `Entity with id - ${id} could not be updated.`;
    }
    this.log.info('Entity successfully updated');
    return entity;
  }
}

module.exports = EntityService;
