const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Contract = require('../../src/models/Contract.model');
const Entity = require('../../src/models/Entity.model');
const mockContracts = require('../mock-data/mock-contracts.js');
const mockEntities = require('../mock-data/mock-entity.js');
const databaseActions = require('../services/database-actions/create-types');

const { createEntity } = databaseActions;
const request = supertest(app);


describe('Contract Endpoints', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/contract';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  beforeEach(async (done) => {
    await Contract.insertMany(mockContracts);
    done();
  });
  afterEach(async (done) => {
    await Entity.deleteMany();
    await Contract.deleteMany();
    done();
  });
  afterAll(async (done) => {
    await Entity.deleteMany();
    await Contract.deleteMany();
    await mongoose.connection.close();
    done();
  });
  describe('GET methods', () => {
    it('GET /:entityId/contract will return 200 and an empty array if if no contracts exist.', async (done) => {
      await Contract.deleteMany();
      const entityId = mockEntities[0]._id;
      const res = await request.get(`/entity/${entityId}/contract`);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([]);
      done();
    });
    it('GET /:entityId/contract will return 200 and all contracts belonging to it.', async (done) => {
      const entityId = mockEntities[0]._id;
      const res = await request.get(`/entity/${entityId}/contract`);
      const { body } = res;
      expect(res.status).toBe(200);
      expect(body.length).toBeGreaterThan(1);
      body.forEach((contract) => {
        expect(contract.entity.toString()).toBe(entityId);
      });
      done();
    });
    it('GET /:entityId/:contractId will return 404 if the entityId is invalid.', async (done) => {
      const entityId = mockEntities[1]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.get(`/entity/${entityId}/contract/${contractId}`);
      expect(res.status).toBe(404);
      done();
    });
    it('GET /:entityId/contract/:contractId will return 404 if the contractId is invalid.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[0]._id;
      const res = await request.get(`/entity/${entityId}/contract/${contractId}`);
      expect(res.status).toBe(404);
      done();
    });
    it('GET /:entityId/contract/:contractId will retrun 200 and the correct contract.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.get(`/entity/${entityId}/contract/${contractId}`);
      expect(res.status).toBe(200);
      expect(res.body.entity).toBe(entityId);
      expect(res.body._id.toString()).toBe(contractId);
      done();
    });
  });

  describe('POST method', () => {
    it('POST /:entityId/contract will return 400 if entityId is invalid.', async (done) => {
      const entityId = mockEntities[1]._id;
      const contract = mockContracts[0];
      const res = await request.post(`/entity/${entityId}/contract`)
        .send(contract);
      expect(res.status).toBe(400);
      done();
    });
    it('POST /:entityId/contract will return 400 if data is invalid.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contract = null;
      const res = await request.post(`/entity/${entityId}/contract`).send(contract);
      expect(res.status).toBe(400);
      done();
    });
    it('POST /:entityId/contract will return 200 when new contract is successfully created.', async (done) => {
      const entity = await createEntity(mockEntities[1], request);
      const entityId = entity._id;
      const contract = mockContracts[0];
      const res = await request.post(`/entity/${entityId}/contract`)
        .send(contract);
      expect(res.status).toBe(200);
      expect(res.body.entity).toBe(entityId);
      done();
    });
  });

  describe('PUT method', () => {
    it('PUT /:entityId/:contractId will return 404 if the contractId is invalid.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[1]._id;
      const res = await request.put(`/entity/${entityId}/contract/${contractId}`).send({
        location_end: 'Fairfax, VA',
      });
      expect(res.body.message).toContain('Cast to ObjectId failed for value "undefined" at path "_id" for model "Contract"');
      expect(res.status).toBe(404);
      done();
    });
    it('PUT /:entityId/:contractId will return 200 if successfully updated.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.put(`/entity/${entityId}/contract/${contractId}`).send({
        location_end: 'Fairfax, VA',
      });
      expect(res.status).toBe(200);
      expect(res.body.entity).toBe(entityId);
      expect(res.body._id).toBe(contractId);
      expect(res.body.location_end).toBe('Fairfax, VA');
      done();
    });
  });

  describe('DELETE method', () => {
    it('DELETE /:entityId/:contractId will return 400 if the entityId is invalid.', async (done) => {
      const entityId = mockEntities[1]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.delete(`/entity/${entityId}/contract/${contractId}`);
      expect(res.body.message).toContain('Cast to ObjectId failed for value "undefined" at path "_id" for model "Entity"');
      expect(res.status).toBe(400);
      done();
    });
    it('DELETE /:entityId/:contractId will return 400 if the contractId is invalid.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[0]._id;
      const res = await request.delete(`/entity/${entityId}/contract/${contractId}`);
      expect(res.body.message).toContain('Cast to ObjectId failed for value "undefined" at path "_id" for model "Contract"');
      expect(res.status).toBe(400);
      done();
    });
    it('DELETE /:entityId/:contractId will return 200 if the contract is succesfully deleted.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.delete(`/entity/${entityId}/contract/${contractId}`);
      expect(res.status).toBe(200);
      expect(res.body.deletedCount).toBe(1);
      done();
    });
  });
});
