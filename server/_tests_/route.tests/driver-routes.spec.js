const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

const Contract = require('../../src/models/Contract.model');
const Driver = require('../../src/models/Driver.model');
const mockContracts = require('../mock-data/mock-contracts.js');
const mockDrivers = require('../mock-data/mock-driver.js');


describe('Driver endpoints', () => {
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
    await Contract.deleteMany();
    await Driver.deleteMany();
    await mongoose.connection.close();
    done();
  });
  describe('GET methods', () => {
    it('GET /driver will return 200 and an empty array if no drivers exist in the database', async (done) => {
      const res = await request.get('/driver');
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([]);
      done();
    });
    it('GET /driver will return all drivers in the database', async (done) => {
      await Driver.insertMany(mockDrivers);
      const res = await request.get('/driver');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(mockDrivers.length);
      done();
    });
    it('GET /driver/:driverId will return 200 if a user is in the database.', async (done) => {
      const driver = await Driver.insertMany(mockDrivers[0]);
      const driverID = driver[0]._id;
      const getDriver = await request.get(`/driver/${driverID}`);
      expect(getDriver.body._id).toEqual(driverID.toString())
      expect(getDriver.status).toBe(200);
      done();
    });
    it('GET /driver/:driverId will return 404 if a user is not in the database', async (done) => {
      const driverID = mockDrivers[1]._id;
      const getDriver = await request.get(`/driver/${driverID}`);
      expect(getDriver.status).toBe(404);
      expect(getDriver.text).toEqual('The driver was not found in the database.');
      done();
    });

    it('GET /driver/:driverId/contract will return all contracts related to a driver', async (done) => {
      await Contract.insertMany(mockContracts);
      const driverId = mockDrivers[1]._id;
      const foundContracts = await request.get(`/driver/${driverId}/contract/`);
      // There are only two mock-contracts with a driverID
      expect(foundContracts.body.length).toBe(2);
      foundContracts.body.forEach((contract) => {
        expect(contract.driver).toBe(driverId);
      });
      done();
    });

    it('GET /driver/:driverId/:contractId will return one contract related to a driver', async (done) => {
      await Contract.insertMany(mockContracts);
      const driverId = mockDrivers[1]._id;
      const foundContracts = await request.get(`/driver/${driverId}/contract`);
      const contractId = foundContracts.body[0]._id;
      const contract = await request.get(`/driver/${driverId}/contract/${contractId}/`);
      expect(contract.status).toBe(200);
      expect(contract.body.driver.toString()).toBe(driverId);
      done();
    });
  });

  describe('POST method', () => {
    it('POST /driver will return 200 if a driver is created', async (done) => {
      const newDriver = await request.post('/driver')
        .send(mockDrivers[0])
        .set('Accept', 'application/json');
      expect(newDriver.status).toBe(200);
      done();
    });
    it('POST /driver will return 400 if invalid entry.', async (done) => {
      const newDriver = await request.post('/driver');
      expect(newDriver.status).toBe(400);
      expect(newDriver.body).toStrictEqual({});
      done();
    });
  });
  
  describe('DELETE method', () => {
    it('DELETE /driver/:driverId will delete a driver from the database and return 200', async (done) => {
      const allDrivers = await Driver.insertMany(mockDrivers);
      const allDriversLength = allDrivers.length;
      const driverId = allDrivers[0]._id.toString();
      const deleted = await request.delete(`/driver/${driverId}`);
      expect(deleted.status).toBe(200);
      expect(deleted.body.deletedCount).toBe(1);
      expect(deleted.body.message).toBe('Driver deleted successfully.');
      const allDriversAfterDelete = await request.get('/driver');
      expect(allDriversAfterDelete.status).toBe(200);
      const allDriversAfterDeleteLength = allDriversAfterDelete.body.length;
      expect(allDriversAfterDeleteLength).toBe(allDriversLength - 1);
      done();
    });
    it('DELETE /driver/:driverId will return 404 and an error if unable to delete driver.', async (done) => {
      await Driver.insertMany(mockDrivers[0]);
      const deleted = await request.delete(`/driver/${mockDrivers[1]._id}`);
      expect(deleted.status).toBe(404);
      expect(deleted.text).toEqual('There was an error deleting this driver account.');
      done();
    });
  });
  describe('PUT method', () => {
    it('PUT /driver/:driverId will return 200 if successfully updated.', async (done) => {
      await Driver.insertMany(mockDrivers[1]);
      const updatedDriver = await request.put(`/driver/${mockDrivers[1]._id}`)
        .send(mockDrivers[2]);
      expect(updatedDriver.status).toBe(200);
      expect(updatedDriver.body).not.toEqual(mockDrivers[1]);
      done();
    });
    it('PUT /driver/:driverId will return 404 if unsuccessfully updated.', async (done) => {
      const updatedDriver = await request.put(`/driver/${mockDrivers[1]._id}`);
      expect(updatedDriver.status).toBe(404);
      expect(updatedDriver.text).toStrictEqual('Driver could not be updated. Invalid ID.');
      done();
    });
  });
});
