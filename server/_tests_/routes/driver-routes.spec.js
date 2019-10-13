const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

const Contract = require('../../src/models/Contract.model');
const Driver = require('../../src/models/Driver.model');
const mockContracts = require('../mock-data/mock-contracts.js');
const mockEntities = require('../mock-data/mock-entity.js');
const mockDriver = require('../mock-data/mock-driver.js');
const service = require('../services/compare');

describe('Driver routes', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/driver';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  afterEach(async (done) => {
    // await Driver.deleteMany();
    done();
  });
  afterAll(async (done) => {
    await mongoose.connection.close();
    done();
  });

  it('POST /carryme/driver will create a new driver in the database', async (done) => {
    const newDriver = await request.post('/carryme/driver')
      .send(mockDriver[0])
      .set('Accept', 'application/json');
    const driver = newDriver.body;
    expect(newDriver.status).toBe(200);
    service.compareObjects(mockDriver[0], driver);
    done();
  });
  it.only('GET /carryme/driver/:driverId will return one driver from the database', async (done) => {
    let driverID = null;
    const driver = await Driver.insertMany(mockDriver[0]);
    driverID = driver[0]._id
    const getDriver = await request.get(`/driver/${driverID}`);
    console.log(getDriver.body);
    done();
  });
  it('GET /carryme/:driverId/contract will return all contracts related to a driver', async (done) =>{
    done();
  });
  it('GET /carryme/:driverId/:contractId will return one contract related to a driver', async (done) => {
    done();
  });
  it('PUT /carryme/:diverId will update driver information in the database', async (done) => {
    done();
  });
  it('DELETE /carryme/:driverId will delete a driver from the database', async (done) => {
    done();
  });

});