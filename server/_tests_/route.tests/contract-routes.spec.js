const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Contract = require('../../src/models/Contract.model');
const Entity = require('../../src/models/Entity.model');
const mockContracts = require('../mock-data/mock-contracts.js');
const mockEntities = require('../mock-data/mock-entity.js');

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

  it('GET /contract/:entityId/contract will return 200 if no contracts are in the Db', async (done) => {
    const res = await request.get(`/contract/${mockEntities[0]._id}/contract`);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
    done();
  });
  it('GET /contract/:entityId/contract will return all contracts in the db related to the entity', async (done) => {
    let entityID = null;
    await Contract.insertMany(mockContracts);
    const entity = await Entity.insertMany(mockEntities[0]);
    entityID = entity[0]._id.toString();
    const contracts = await request.get(`/contract/${entityID}/contract`);
    contracts.body.forEach((contract) => { 
      expect(contract.entity).toBe(entityID);
    });
    expect(contracts.status).toBe(200);
    done();
  });
  it('GET /contract/:entityID/:contractId will return one contract from the db', async (done) => {
    let entityID = null;
    let contractID = null;
    const entity = await Entity.insertMany(mockEntities[0]);
    // Use .toString() because contract[0]._id === mongoObjectID and
    // .getContract.body._id === string
    entityID = entity[0]._id.toString();
    const contract = await Contract.insertMany(mockContracts[0]);
    contractID = contract[0]._id.toString();
    const getContract = await request.get(`/contract/${entityID}/${contractID}`);
    expect(getContract.body._id).toBe(contractID);
    expect(getContract.status).toBe(200);
    done();
  });
  
  it('POST /contract/:entityId/contract will post a contract to an Entity', async (done) => {
    let entityID = null;
    const entity = await Entity.insertMany(mockEntities[0]);
    entityID = entity[0]._id.toString();
    const newContract = await request.post(`/contract/${entityID}/contract`)
      .send(mockContracts[0])
      .set('Accept', 'application/json');
    const contractEntityID = newContract.body.entity;
    expect(entityID).toEqual(contractEntityID);
    done();
  });

  it('PUT /contract/:entityId/contract will update a contract in the DB', async (done) => {
    await Contract.insertMany(mockContracts);
    await Entity.insertMany(mockEntities[0]);
    let entityID = null;
    let contractID = null;
    const entity = await request.get('/entity/');
    entityID = entity.body[0]._id.toString();
    const contract = await request.get(`/contract/${entityID}/contract`);
    contractID = contract.body[0]._id.toString();
    const contractAvailability = contract.body[0].availability;
    const updatedContract = await request.put(`/contract/${entityID}/${contractID}`)
      .send(mockContracts[1])
      .set('Accept', 'application/json');
    expect(updatedContract.body._id).toBe(contractID);
    expect(updatedContract.body.availability).not.toBe(contractAvailability);    
    done();
  });

  it('DELETE /contract/:entityId/contract will delete a contract from the DB', async (done) => {
    await Contract.insertMany(mockContracts);
    await Entity.insertMany(mockEntities[0]);
    let entityID = null;
    let contractID = null;
    const entity = await request.get('/entity/');
    entityID = entity.body[0]._id.toString();
    const contract = await request.get(`/contract/${entityID}/contract`);
    contractID = contract.body[0]._id
    const originalContractLength = contract.body.length;
    // Delete contract.
    const deleted = await request.delete(`/contract/${entityID}/${contractID}`);
    // Requery database for contracts
    const newContracts = await request.get(`/contract/${entityID}/contract`);
    newContractsLength = newContracts.body.length;
    expect(deleted.statusCode).toBe(200);
    expect(deleted.text).toBe('Contract removed successfully!');
    expect(originalContractLength).not.toBe(newContractsLength);
    expect(newContractsLength).toBe(originalContractLength - 1);
    done();
  });
});
