const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app');

const Contract = require('../src/models/Contract.model');
const Entity = require('../src/models/Entity.model');
const mockContracts = require('./mock-data/mock-contracts.js');
const mockEntities = require('./mock-data/mock-entity.js');

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
  afterEach(async (done) => {
    await Contract.deleteMany();
    done();
  });
  afterAll(async (done) => {
    await Entity.deleteMany();
    await mongoose.connection.close();
    done();
  });

  it('GET /carryme/:entityId/contract will return 200 if no contracts are in the Db', async (done) => {
    const res = await request.get(`/carryme/${mockEntities[0]._id}/contract`);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
    done();
  });

  it('GET /carryme/contract/:contractId will return the contract from the db', async (done) => {
    let contractID = null;
    const contract = await Contract.insertMany(mockContracts[0]);
    // Use .toString() because contract[0]._id === object and
    // .getContract.body._id === string
    contractID = contract[0]._id.toString();
    const getContract = await request.get(`/carryme/contract/${contract[0]._id}`);
    expect(getContract.body._id).toBe(contractID);
    expect(getContract.status).toBe(200);
    done();
  });
  
  it('POST /carryme/:entityId/contract will post a contract to an Entity', async (done) => {
    let entityID = null;
    const entity = await Entity.insertMany(mockEntities[0]);
    entityID = entity[0]._id.toString();
    const newContract = await request.post(`/carryme/${entityID}/contract`)
      .send(mockContracts[0])
      .set('Accept', 'application/json');
    const contractEntityID = newContract.body.entity;
    expect(entityID).toEqual(contractEntityID);
    done();
  });
});
