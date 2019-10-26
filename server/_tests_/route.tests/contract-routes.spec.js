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


describe.skip('Contract Endpoints', () => {
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
      const entityId = mockEntities[2]._id;
      const res = await request.get(`/${entityId}/contract`);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([]);
      done();
    });
    it('GET /:entityId/contract will return 200 and all contracts belonging to it.', async (done) => {
      const entityId = mockEntities[0]._id;
      const res = await request.get(`/${entityId}/contract`);
      const { body } = res;
      expect(res.status).toBe(200);
      expect(body.length).toBeGreaterThan(1);
      body.forEach((contract) => {
        expect(contract.entity.toString()).toBe(entityId); 
      });
      done();
    });
    it('GET /:entityId/:contractId will return 400 if the entityId is invalid.', async (done) => {
      const entityId = mockEntities[1]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.get(`/${entityId}/${contractId}`);
      expect(res.status).toBe(400);
      done();
    });
    it('GET /:entityId/:contractId will return 400 if the contractId is invalid.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[0]._id;
      const res = await request.get(`/${entityId}/${contractId}`);
      expect(res.status).toBe(400);
      done();
    });
    it('GET /:entityId/:contractId will retrun 200 and the correct contract.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contractId = mockContracts[2]._id;
      const res = await request.get(`/${entityId}/${contractId}`);
      expect(res.status).toBe(200);
      expect(res.body.entity).toBe(entityId);
      expect(res.body._id.toString()).toBe(contractId);
      done();
    });

    describe('POST method', () => {
      it('POST /:entityId/contract will return 400 if entityId is invalid.', async (done) => {
        const entityId = mockEntities[1]._id;
        const contract = mockContracts[0];
        const res = await request.post(`/${entityId}/contract`)
          .send(contract);
        expect(res.status).toBe(400);
        done();
      });
      it('POST /:entityId/contract will return 400 if data is invalid.', async (done) => {       
        const entityId = mockEntities[0]._id;
        const contract = null;
        const res = await request.post(`/${entityId}/contract`).send(contract);
        expect(res.status).toBe(400);
        done();
      });
      it('POST /:entityId/contract will return 200 when new contract is successfully created.', async (done) => {
        const entity = await createEntity(mockEntities[1], request);
        const entityId = entity._id;
        const contract = mockContracts[0];
        const res = await request.post(`/${entityId}/contract`)
          .send(contract);
        expect(res.status).toBe(200);
        expect(res.body.entity).toBe(entityId);
        done();
      });
    });

    describe('PUT method', () => {
      it('PUT /:entityId/:contractId will return 400 if the contractId is invalid.', async (done) => {
        const entityId = mockEntities[0]._id;
        const contractId = mockContracts[1]._id;
        const res = await request.put(`/${entityId}/${contractId}`).send({
          location_end: 'Fairfax, VA',
        });
        expect(res.body.message).toContain('Cast to ObjectId failed for value "undefined" at path "_id" for model "Contract"');
        expect(res.status).toBe(400);
        done();
      });
      it('PUT /:entityId/:contractId will return 200 if successfully updated.', async (done) => {
        const entityId = mockEntities[0]._id;
        const contractId = mockContracts[2]._id;
        const res = await request.put(`/${entityId}/${contractId}`).send({
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
        const res = await request.delete(`/${entityId}/${contractId}`);
        expect(res.body.message).toContain('Cast to ObjectId failed for value "undefined" at path "_id" for model "Entity"');
        expect(res.status).toBe(400);
        done();
      });
      it('DELETE /:entityId/:contractId will return 400 if the contractId is invalid.', async (done) => {
        const entityId = mockEntities[0]._id;
        const contractId = mockContracts[0]._id;
        const res = await request.delete(`/${entityId}/${contractId}`);
        expect(res.body.message).toContain('Cast to ObjectId failed for value "undefined" at path "_id" for model "Contract"');
        expect(res.status).toBe(400);
        done();
      });
      it('DELETE /:entityId/:contractId will return 200 if the contract is succesfully deleted.', async (done) => {
        const entityId = mockEntities[0]._id;
        const contractId = mockContracts[2]._id;
        const res = await request.delete(`/${entityId}/${contractId}`);
        expect(res.status).toBe(200);
        expect(res.body.deletedCount).toBe(1);
        done();
      });
    });
  });

  // it('GET /contract/:entityId/contract will return 200 if no contracts are in the Db', async (done) => {
  //   const res = await request.get(`/contract/${mockEntities[0]._id}/contract`);
  //   expect(res.status).toBe(200);
  //   expect(res.body).toStrictEqual([]);
  //   done();
  // });
  // it('GET /contract/:entityId/contract will return all contracts in the db related to the entity', async (done) => {
  //   let entityID = null;
  //   await Contract.insertMany(mockContracts);
  //   const entity = await Entity.insertMany(mockEntities[0]);
  //   entityID = entity[0]._id.toString();
  //   const contracts = await request.get(`/contract/${entityID}/contract`);
  //   contracts.body.forEach((contract) => { 
  //     expect(contract.entity).toBe(entityID);
  //   });
  //   expect(contracts.status).toBe(200);
  //   done();
  // });
  // it('GET /contract/:entityID/:contractId will return one contract from the db', async (done) => {
  //   let entityID = null;
  //   let contractID = null;
  //   const entity = await Entity.insertMany(mockEntities[0]);
  //   // Use .toString() because contract[0]._id === mongoObjectID and
  //   // .getContract.body._id === string
  //   entityID = entity[0]._id.toString();
  //   const contract = await Contract.insertMany(mockContracts[0]);
  //   contractID = contract[0]._id.toString();
  //   const getContract = await request.get(`/contract/${entityID}/${contractID}`);
  //   expect(getContract.body._id).toBe(contractID);
  //   expect(getContract.status).toBe(200);
  //   done();
  // });
  
  // it('POST /contract/:entityId/contract will post a contract to an Entity', async (done) => {
  //   let entityID = null;
  //   const entity = await Entity.insertMany(mockEntities[0]);
  //   entityID = entity[0]._id.toString();
  //   const newContract = await request.post(`/contract/${entityID}/contract`)
  //     .send(mockContracts[0])
  //     .set('Accept', 'application/json');
  //   const contractEntityID = newContract.body.entity;
  //   expect(entityID).toEqual(contractEntityID);
  //   done();
  // });

  // it('PUT /contract/:entityId/contract will update a contract in the DB', async (done) => {
  //   await Contract.insertMany(mockContracts);
  //   await Entity.insertMany(mockEntities[0]);
  //   let entityID = null;
  //   let contractID = null;
  //   const entity = await request.get('/entity/');
  //   entityID = entity.body[0]._id.toString();
  //   const contract = await request.get(`/contract/${entityID}/contract`);
  //   contractID = contract.body[0]._id.toString();
  //   const contractAvailability = contract.body[0].availability;
  //   const updatedContract = await request.put(`/contract/${entityID}/${contractID}`)
  //     .send(mockContracts[1])
  //     .set('Accept', 'application/json');
  //   expect(updatedContract.body._id).toBe(contractID);
  //   expect(updatedContract.body.availability).not.toBe(contractAvailability);    
  //   done();
  // });

  // it('DELETE /contract/:entityId/contract will delete a contract from the DB', async (done) => {
  //   await Contract.insertMany(mockContracts);
  //   await Entity.insertMany(mockEntities[0]);
  //   let entityID = null;
  //   let contractID = null;
  //   const entity = await request.get('/entity/');
  //   entityID = entity.body[0]._id.toString();
  //   const contract = await request.get(`/contract/${entityID}/contract`);
  //   contractID = contract.body[0]._id
  //   const originalContractLength = contract.body.length;
  //   // Delete contract.
  //   const deleted = await request.delete(`/contract/${entityID}/${contractID}`);
  //   // Requery database for contracts
  //   const newContracts = await request.get(`/contract/${entityID}/contract`);
  //   newContractsLength = newContracts.body.length;
  //   expect(deleted.statusCode).toBe(200);
  //   expect(deleted.text).toBe('Contract removed successfully!');
  //   expect(originalContractLength).not.toBe(newContractsLength);
  //   expect(newContractsLength).toBe(originalContractLength - 1);
  //   done();
  // });
});