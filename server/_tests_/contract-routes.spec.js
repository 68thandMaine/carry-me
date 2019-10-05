const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./app');

const Contract = require('../src/models/Contract.model');
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
    await Contract.insertMany(mockContracts[0]);
    done();
  });
  afterEach(async (done) => {
    await Contract.deleteMany();
    done();
  });
  afterAll(async (done) => {
    mongoose.connection.close();
    done();
  });

  it('GET /carryme/:entityId/contract will return 200 if no contracts are in the Db', async(done) => {
    const res = await request.get(`/carryme/${mockEntities[0]._id}/contract`);
    console.log(res);
    done();
  });
  
  // it('POST /carryme/:entityId/contract will error without appropriate entityId', async(done) => {
  //   const res = await request.post(`/carryme/${entityId}`)
  // });
});