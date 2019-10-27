const mongoose = require('mongoose');
const serviceLocator = require('../../config/depInj');

const EntityService = serviceLocator.get('entityService');

const testServices = require('../services/compare');

const { compareObjects } = testServices;

const Entity = require('../../src/models/Entity.model');
const mockEntities = require('../mock-data/mock-entity');
const mockDrivers = require('../mock-data/mock-driver');

describe('Entity Service', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/entity';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  beforeEach(async (done) => {
    await Entity.insertMany(mockEntities);
    done();
  });
  afterEach(async (done) => {
    await Entity.deleteMany();
    done();
  });
  afterAll(async (done) => {
    await Entity.deleteMany();
    await mongoose.connection.close();
    done();
  });
  describe('listAllEntities()', () => {
    it('listAllEntities will return all Entities in the database', async (done) => {
      const entities = await EntityService.listAllEntities();
      expect(entities.length).toBe(mockEntities.length);
      done();
    });
    it('listAllEntities will return an empty array if there are no Entities in the database.', async (done) => {
      await Entity.deleteMany();
      const entities = await EntityService.listAllEntities();
      expect(entities).toStrictEqual([]);
      done();
    });
  });
  describe('createEntity(body)', () => {
    it('If an entity name  already exists during account creation then an error message will return.', async (done) => {
      const entity = mockEntities[0];
      const createdEntity = await EntityService.createEntity(entity);
      expect(createdEntity).toBe('Entity with this name already exists.');
      done();
    });
    it('If no email account exists, then an Entity is saved.', async (done) => {
      await Entity.deleteMany();
      const entity = mockEntities[1];
      const createdEntity = await EntityService.createEntity(entity);
      expect(createdEntity._id).toBeTruthy();
      expect(createdEntity.__v).toBe(0);
      compareObjects(entity, createdEntity);
      done();
    });
  });
  describe('getEntityById(id)', () => {
    it('If the entityId does not exist, then an error message is returned.', async (done) => {
      await Entity.deleteMany();
      const entityId = mockEntities[0]._id;
      const foundEntity = await EntityService.getEntityById(entityId);
      expect(foundEntity).toBe(`Entity with id - ${entityId} does not exist in the database.`);
      done();
    });
    it('If the entityId exists, then the entity object with the entityId is returned.', async (done) => {
      const entityId = mockEntities[0]._id;
      const foundEntity = await EntityService.getEntityById(entityId);
      expect(foundEntity._id.toString()).toBe(entityId);
      done();
    });
  });
  describe('deleteEntity(id)', () => {
    it('If the entityId is invalid, then an error message is returned.', async (done) => {
      const entityId = mockDrivers[1]._id;
      const deletedEntity = await EntityService.deleteEntity(entityId);
      expect(deletedEntity).toBe(`Entity with id - ${entityId} does not exist.`);
      done();
    });
    it('If the entityId is valid, then a delete success message is returned.', async (done) => {
      const entityId = mockEntities[0]._id;
      const deletedEntity = await EntityService.deleteEntity(entityId);
      expect(deletedEntity.message).toBe('Entity deleted successfully.');
      done();
    });
  });
  describe('updateEntity(id, body)', () => {
    it('If the entityId is invalid, then an error message is returned.', async (done) => {
      const entityId = mockDrivers[1]._id;
      const updates = mockEntities[1];
      const updatedEntity = await EntityService.updateEntity(entityId, updates);
      expect(updatedEntity).toBe(`Entity with id - ${entityId} could not be updated.`);
      done();
    });
    it('If the entityId is valid, then the updated Entity is returned.', async (done) => {
      await Entity.deleteOne(mockEntities[1]);
      const entityId = mockEntities[0]._id;
      const updates = mockEntities[1];
      const updatedEntity = await EntityService.updateEntity(entityId, updates);
      expect(updatedEntity._id.toString()).toBe(entityId);
      done();
    });
  });
});
