const mongoose = require('mongoose');
const serviceLocator = require('../../config/depInj');

const EntityService = serviceLocator.get('entityService');

const testServices = require('../services/compare');

const { compareObjects } = testServices;

const Entity = require('../../src/models/Entity.model');
const mockEntities = require('../mock-data/mock-entity');

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
    it('listAllEntites will return all Entities in the database', async (done) => {
      done();
    });
    it('listAllEntities will return an empty array if there are no Entities in the database.', async (done) => {
      done();
    });
  });
  describe('createEntity(body)', () => {
    it('If an email account alread exists during account cration then an error message will return.', async (done) => {
      done();
    });
    it('If no email account exists, then an Entity is saved.', async (done) => {
      done();
    });
  });
  describe('getEntityById(id)', () => {
    it('If the entityId does not exist, then an error message is returned.', async (done) => {
      done();
    });
    it('If the entityId exists, then the entity object with the entityId is returned.', async (done) => {
      done();
    });
  });
  describe('deleteEntity(id)', () => {
    it('If the entityId is invalid, then an error message is returned.', async (done) => {
      done();
    });
    it('If the entityId is valid, then a delete success message is returned.', async (done) => {
      done();
    });
  });
  describe('updateEntity(id)', () => {
    it('If the entityId is invalid, then an error message is returned.', async (done) => {
      done();
    });
    it('If the entityId is valid, then the updated Entity is returned.', async (done) => {
      done();
    });
  });
});
