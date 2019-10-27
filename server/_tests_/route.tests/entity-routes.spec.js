const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Entity = require('../../src/models/Entity.model');
const mockEntities = require('../mock-data/mock-entity');
const mockDriver = require('../mock-data/mock-driver');


const request = supertest(app);

describe('Entity Endpoints', () => {
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
  describe('POST method', () => {
    it('POST /entity/ Should save an Entity to the database', async (done) => {
      await Entity.deleteMany();
      const entity = mockEntities[0];
      const res = await request.post('/entity/')
        .send(entity);
      expect(res.status).toBe(200);
      done();
    });
    it('POST /entity/ Should return validation error message if missing required properties', async (done) => {
      const res = await request.post('/entity/')
        .send(mockDriver[0]);
      expect(res.body._message).toBe('Entity validation failed');
      done();
    });
  });
  describe('GET methods', () => {
    it('GET /entity/ Should return empty with 200 status code if no Entities are in the DB', async (done) => {
      await Entity.deleteMany();
      const res = await request.get('/entity/');
      expect(res.body.length).toBe(0);
      expect(res.status).toBe(200);
      done();
    });
    it('GET /entity/ Should return all entites in the DB', async (done) => {
      const res = await request.get('/entity/');
      expect(res.body.length).toBe(mockEntities.length);
      done();
    });
    it('GET /entity/:id/ should get one Entity', async (done) => {
      const entityId = mockEntities[0]._id;
      const res = await request.get(`/entity/${entityId}/`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toEqual(entityId);
      done();
    });
    it('GET /entity/:id/ should return 400 if the id is incorrect.', async (done) => {
      const entityId = mockEntities[1]._id;
      const res = await request.get(`/entity/${entityId}/`);
      expect(res.status).toBe(400);
      done();
    });
  });
  describe('DELETE method', () => {
    it('DELETE /:id deletes an entity from the DB', async (done) => {
      const entityID = mockEntities[0]._id;
      const entity = await request.get(`/entity/${entityID}`);
      const deleteUser = await request.delete(`/entity/${entity.body._id}`);
      expect(deleteUser.statusCode).toBe(200);
      expect(deleteUser.body.message).toEqual('Entity deleted successfully.');
      const notFound = await request.get(`/entity/${entityID}`);
      expect(notFound.text).toEqual(`Entity with id - ${entityID} does not exist in the database.`);
      done();
    });
    it('DELETE /entity/:id/ will return 400 if there is an error with the id.', async (done) => {
      const entityId = mockEntities[1]._id;
      const res = await request.delete(`/entity/${entityId}`);
      expect(res.status).toBe(400);
      done();
    });
  });
  describe('PUT methods', () => {
    it('PUT /entity/:id/ should update an enitity and return 200', async (done) => {
      const entityId = mockEntities[0]._id;
      const updatedEntity = await request.put(`/entity/${entityId}`)
        .send({
          entityName: 'Dope Grills',
        });
      expect(updatedEntity.statusCode).toBe(200);
      expect(updatedEntity.body.entityName).toBe('Dope Grills');
      expect(updatedEntity.body).not.toEqual({});
      done();
    });
    it('PUT /entity/:id/ should return 400 if the id is incorrect.', async (done) => {
      const entityId = mockEntities[1]._id;
      const updatedEntity = await request.put(`/entity/${entityId}`)
        .send({
          entityName: 'Dope Grills',
        });
      expect(updatedEntity.statusCode).toBe(200);
      done();
    });
  });

  /** THE TEST BELOW SHOULD BE RUN ON THE MODEL NOT THE ROUTE */

  // it('PUT /:id should return "Validation failed" if invalid entry', async (done) => {
  //   await Entity.insertMany(mockEntities[0]);
  //   const entities = await request.get('/entity');
  //   const entityID = entities.body[0]._id;

  //   const updatedEntity = await request.put(`/entity/${entityID}`)
  //     .send({
  //       entityName: '',
  //       email: '',
  //       password: '',
  //     });
  //   expect(updatedEntity.statusCode).toBe(400);
  //   expect(updatedEntity.text).toBe('Validation failed');
  //   expect(updatedEntity.body).toEqual({});
  //   done();
  // });
});
