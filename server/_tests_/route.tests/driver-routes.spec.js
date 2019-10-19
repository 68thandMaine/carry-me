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

describe.skip('Driver endpoints', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/driver';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  afterEach(async (done) => {
    await Contract.deleteMany();
    await Driver.deleteMany();
    done();
  });
  afterAll(async (done) => {
    // await Contract.deleteMany();
    // await Driver.deleteMany();
    await mongoose.connection.close();
    done();
  });
  
  it('POST /driver will create a new driver in the database', async (done) => {
    const newDriver = await request.post('/driver/')
    .send(mockDriver[0])
    .set('Accept', 'application/json');
    const driver = newDriver.body;
    expect(newDriver.status).toBe(200);
    service.compareObjects(mockDriver[0], driver);
    done();
  });
  it('GET /driver/:driverId will return one driver from the database', async (done) => {
    const driver = await Driver.insertMany(mockDriver[0]);
    const driverID = driver[0]._id;
    const getDriver = await request.get(`/driver/${driverID}`);
    expect(getDriver.status).toBe(200);
    service.compareObjects(mockDriver[0], getDriver.body);
    done();
  });
  it('GET /driver/:driverId/contracts will return all contracts related to a driver', async (done) =>{
    await Contract.insertMany(mockContracts);
    const driver = await Driver.insertMany(mockDriver[1]);
    const driverID = driver[0]._id.toString();
    const foundContracts = await request.get(`/driver/${driverID}/contracts`);
    // There are only two mock-contracts with a driverID
    expect(foundContracts.body.length).toBe(2);
    foundContracts.body.forEach((contract) => {
      expect(contract.driver).toBe(driverID);
    });
    done();
  });
  it('GET /driver/:driverId/:contractId will return one contract related to a driver', async (done) => {
    await Contract.insertMany(mockContracts);
    const driver = await Driver.insertMany(mockDriver);
    const driver1_ID = driver[0]._id.toString();
    const driver2_ID = driver[1]._id.toString();
    const foundContracts = await request.get(`/driver/${driver2_ID}/contracts`);
    const contractID = foundContracts.body[0]._id
    const contract = await request.get(`/driver/${driver2_ID}/${contractID}`);
    expect(contract.body.driver).toBe(driver2_ID);
    expect(contract.body.driver).not.toBe(driver1_ID);
    expect(contract.status).toBe(200);
    done();
  });
  it('PUT /driver/:diverId will update driver information in the database', async (done) => {
    let driverID = null;
    const driver = await Driver.insertMany(mockDriver[0]);
    driverID = driver[0]._id.toString();
    const getDriver = await request.put(`/driver/${driverID}`)
      .send(
        { firstName: 'Dick' }
      )
      .set('Accept', 'application/json');
    expect(getDriver.status).toBe(200);
    expect(getDriver.body.firstName).not.toBe(driver[0].firstName);
    expect(getDriver.body.firstName).toEqual('Dick');
    expect(getDriver.body._id).toEqual(driverID);
    done();
  });
  it('DELETE /driver/:driverId will delete a driver from the database', async (done) => {
    let driverID = null;
    const allDrivers = await Driver.insertMany(mockDriver);
    const allDriversLength = allDrivers.length;
    driverID = allDrivers[0]._id.toString();
    const deleted = await request.delete(`/driver/${driverID}`);
    expect(deleted.status).toBe(200);
    expect(deleted.text).toBe('Successfully deleted driver.');
    const allDriversAfterDelete = await request.get('/driver/');
    expect(allDriversAfterDelete.status).toBe(200);
    const allDriversAfterDeleteLength = allDriversAfterDelete.body.length;
    expect(allDriversAfterDeleteLength).toBe(allDriversLength - 1);
    done();
  });
});
