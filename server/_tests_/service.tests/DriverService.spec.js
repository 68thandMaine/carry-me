const mongoose = require('mongoose');
const serviceLocator = require('../../config/depInj');

const DriverService = serviceLocator.get('driverService');

const testServices = require('../services/compare');

const { compareObjects } = testServices;

const Driver = require('../../src/models/Driver.model');
const mockDrivers = require('../mock-data/mock-driver');

describe('DriverService', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/admin';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  beforeEach(async (done) => {
    await Driver.insertMany(mockDrivers);
    done();
  });
  afterEach(async (done) => {
    await Driver.deleteMany();
    done();
  })
  afterAll(async (done) => {
    await Driver.deleteMany();
    await mongoose.connection.close();
    done();
  });
  describe('listAllDrivers()', () => {
    it('listAllDrivers will return all drivers in the database', async (done) => {
      let drivers = await DriverService.listAllDrivers();
      expect(drivers.length).toBeGreaterThan(1);
      done();
    });
    it('listAllDrivers will return an empty array if no drivers in the database', async (done) => {
      await Driver.deleteMany();
      const drivers = await DriverService.listAllDrivers();
      expect(drivers.length).toBe(0);
      expect(drivers).toStrictEqual([]);
      done();
    });
  });

  describe('createDriver(body)', () => {
    it('If an email account already exists during account creation then an error message will return', async (done) => {
      const driver = mockDrivers[0];
      const createdDriver = await DriverService.createDriver(driver);

      expect(createdDriver).toEqual('An account with the provided email already exists.');
      done();
    });
    it('If no email account exists, then a driver is saved', async (done) => {
      await Driver.deleteMany();
      const driver = mockDrivers[0];
      const createdDriver = await DriverService.createDriver(driver);
      expect(createdDriver._id).toBeTruthy();
      expect(createdDriver.__v).toBe(0);
      compareObjects(driver, createdDriver);
      expect(createdDriver.email).toBe(mockDrivers[0].email);
      done();
    });
  });
  describe('getDriverById(driverId)', () => {
    it('If the driverId does not exist, then an error message is returned', async (done) => {
      await Driver.deleteMany();
      const driver = mockDrivers[1];
      const foundDriver = await DriverService.getDriverById(driver._id);
      expect(foundDriver).toBe('The driver was not found in the database');
      done();
    });
    it('If the driverId exisits, then the driver with that id is returned', async (done) => {
      const driver = mockDrivers[1];
      const foundDriver = await DriverService.getDriverById(driver._id);
      expect(foundDriver._id.toString()).toBe(driver._id);
      expect(foundDriver.email).toEqual(driver.email);
      done();
    });
  });
  describe('deleteDriver(driverId)', () => {
    it('If the driverId is invalid then an error message is returned.', async (done) => {
      await Driver.deleteMany();
      const driver = mockDrivers[1];
      const deletedDriver = await DriverService.deleteDriver(driver._id);
      expect(deletedDriver).toEqual('There was an error deleting this driver account.');
      done();
    });
    it('If the driverId is valid, then a success message is sent', async (done) => {
      const driver = mockDrivers[1];
      const deletedDriver = await DriverService.deleteDriver(driver._id);
      expect(deletedDriver.deletedCount).toBe(1);
      expect(deletedDriver.message).toBe('Driver deleted successfully.');
      done();
    });
  });
  describe('updateDriver(id, body)', () => {
    it('If invalid id, then an error message is returned.', async (done) => {
      const driver = mockDrivers[0];
      const updates = mockDrivers[2];
      const updatedDriver = await DriverService.updateDriver(driver._id, updates);
      expect(updatedDriver).toEqual('Driver could not be updated. Invalid ID.');
      done();
    });
    it('If valid id then the updated driver is returned.', async (done) => {
      const driver = mockDrivers[1];
      const updates = mockDrivers[2];
      const updatedDriver = await DriverService.updateDriver(driver._id, updates);
      expect(updatedDriver.lastName).toEqual(driver.lastName);
      expect(updatedDriver._id.toString()).toEqual(driver._id);
      expect(updatedDriver).not.toEqual(driver);
      done();
    });
  });
});
