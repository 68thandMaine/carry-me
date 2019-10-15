const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

// const Admin = require
const Contract = require('../../src/models/Contract.model');
const Driver = require('../../src/models/Driver.model');
const Entity = require('../../src/models/Entity.model');

const mockContracts = require('../mock-data/mock-contracts');
const mockDrivers = require('../mock-data/mock-driver');
const mockEntities = require('../mock-data/mock-entity');

const request = supertest(app);
const service = require('../services/compare');

describe('Admin Endpoints', () => {
  beforeAll(async (done) => {
    const url = 'mongodb://localhost/admin';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  });
  afterEach(async (done) => {
    await Contract.deleteMany();
    await Driver.deleteMany();
    await Entity.deleteMany();
    done();
  });
  afterAll(async (done) => {
    await Contract.deleteMany();
    await Driver.deleteMany();
    await Entity.deleteMany();
    await mongoose.connection.close();
    done();
  });

  it('GET /admin/contract will return 200 if no contracts are in the db', async (done) => {
    const res = await request.get('/admin/contract');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
    done();
  });
  it('GET /admin/contract will return all contracts in the db', async (done) => {
    await Contract.insertMany(mockContracts);
    const res = await request.get('/admin/contract');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(mockContracts.length);
    done();
  });
  it('GET /admin/:contractId will return one contract from the db', async (done) => {
    let contractId = null;
    await Contract.insertMany(mockContracts);
    const res = await request.get('/admin/contract');
    contractId = res.body[0]._id;
    const foundContract = await request.get(`/admin/contract/${contractId}`);
    expect(foundContract.status).toBe(200);
    expect(foundContract.body._id).toBe(contractId);
    done();
  });
  it('GET /admin/contract/:contractId will return 404 if no contract is found', async (done) => {
    const contractId = mockContracts[3]._id;
    const res = await request.get(`/admin/${contractId}`);
    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({});
    done();
  });
  it('PUT /admin/contract/:contractId will update a contract in the db', async (done) => {
    const contractId = mockContracts[3]._id;
    await Contract.insertMany(mockContracts);
    const foundContract = await request.get(`/admin/contract/${contractId}`);
    const updatedContract = await request.put(`/admin/contract/${contractId}`)
      .send({
        max_bid: 300,
      })
      .set('Accept', 'application/json');
    expect(foundContract.status).toBe(200);
    expect(foundContract.body.shipBy).toContain(mockContracts[3].shipBy);
    expect(updatedContract.status).toBe(200);
    expect(updatedContract.body._id).toBe(foundContract.body._id);
    expect(updatedContract.body.max_bid).not.toBe(mockContracts[3].max_bid);
    done();
  });
  it('DELETE /admin/contract/:contractId will delete a contract from the db', async (done) => {
    const contractId = mockContracts[3]._id;
    await Contract.insertMany(mockContracts);
    const res1 = await request.get('/admin/contract');
    const contractArrayLength = res1.body.length;
    const deleteContract = await request.delete(`/admin/contract/${contractId}`);
    const res2 = await request.get('/admin/contract');
    const updatedContractArrayLength = res2.body.length;
    expect(deleteContract.status).toBe(200);
    expect(deleteContract.text).toBe('Contract removed successfully!');
    expect(updatedContractArrayLength).toBe(contractArrayLength - 1);
    done();
  });
  it('GET /admin/entity returns all entities in the DB', async (done) => {
    await Entity.insertMany(mockEntities);
    const res = await request.get('/admin/entity');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(mockEntities.length);
    done();
  });
  it('GET /admin/entity will return 200 if no entries are in the db', async (done) => {
    const res = await request.get('/admin/entity');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
    done();
  });
  it('GET /admin/:entityId will return 404 if no entity is found', async (done) => {
    const entityId = mockEntities[0]._id;
    const res = await request.get(`/admin/entity/${entityId}`);
    expect(res.status).toBe(404);
    expect(res.text).toBe('Resource not found');
    done();
  });
  it('GET /admin/:entityId will return one entity from the db', async (done) => {
    await Entity.insertMany(mockEntities);
    const entityId = mockEntities[0]._id;
    const res = await request.get(`/admin/entity/${entityId}`);
    expect(res.status).toBe(200);
    expect(res.body.entityName).toContain(mockEntities[0].entityName);
    done();
  });
  it('PUT /admin/entity/:entityId will update an Entity in the db', async (done) => {
    await Entity.insertMany(mockEntities[0]);
    const entityId = mockEntities[0]._id;
    const foundEntity = await request.get(`/admin/entity/${entityId}`);
    const updatedEntity = await request.put(`/admin/entity/${foundEntity.body._id}`)
      .send({
        password: 'G4h8le'
      })
      .set('Accept', 'application/json');
    expect(updatedEntity.status).toBe(200);
    expect(updatedEntity.body._id).toBe(entityId);
    expect(updatedEntity.body).not.toMatchObject(foundEntity.body);
    expect(updatedEntity.body.password).not.toContain(foundEntity.body.password);
    done();
  });
  it('DELETE /admin/entity/:entityId will delete an Entity from the db', async (done) => {
    await Entity.insertMany(mockEntities);
    const entityId = mockEntities[0]._id;
    const res1 = await request.get('/admin/entity');
    const initialEntityArrayLength = res1.body.length;
    const deleteEntity = await request.delete(`/admin/entity/${entityId}`);
    const res2 = await request.get('/admin/entity');
    const deletedEntityArrayLength = res2.body.length;
    expect(deleteEntity.status).toBe(200);
    expect(deleteEntity.text).toBe('Deleted successfully');
    expect(deletedEntityArrayLength).toBe(initialEntityArrayLength - 1);
    done();
  });
  it('GET /admin/driver will return 200 if no drivers are found in the db', async (done) => {
    const res = await request.get('/admin/driver');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
    done();
  });
  it('GET /admin/driver will return all drivers from the db', async (done) => {
    await Driver.insertMany(mockDrivers);
    const res = await request.get('/admin/driver');
    expect(res.body).toMatchObject(mockDrivers);
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(mockDrivers.length);
    done();
  });
  it('GET /admin/driver/:driverId will return one driver from the db', async (done) => {
    await Driver.insertMany(mockDrivers);
    const driverId = mockDrivers[1]._id;
    const res = await request.get(`/admin/driver/${driverId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(mockDrivers[1]);
    expect(res.body.firstName).toContain(mockDrivers[1].firstName);
    done();
  });
  it('GET /admin/driver/:driverId will return 404 if no driver is found', async (done) => {
    const driverId = mockDrivers[1]._id;
    const res = await request.get(`/admin/driver/${driverId}`);
    expect(res.status).toBe(404);
    expect(res.text).toBe('Driver ID not found.');
    done();
  });
  it('PUT /admin/driver/:driverId will update a driver in the db', async (done) => {
    await Driver.insertMany(mockDrivers);
    const res = await request.get('/admin/driver');
    const driver = res.body[0];
    const updatedDriver = await request.put(`/admin/driver/${driver._id}`)
      .send({
        password: '54kdi0',
      })
      .set('Accept', 'appliation/json');
    expect(updatedDriver.status).toBe(200);
    expect(updatedDriver.body._id).toBe(driver._id);
    expect(updatedDriver.body).not.toMatchObject(driver);
    expect(updatedDriver.body.password).not.toContain(driver.password);
    done();
  });
  it('DELETE /admin/driver/:driverId will delete a driver from the db', async (done) => {
    await Driver.insertMany(mockDrivers);
    const driverId = mockDrivers[1]._id;
    const res1 = await request.get('/admin/driver');
    const initialDriverArrayLength = res1.body.length;
    const deleteDriver = await request.delete(`/admin/driver/${driverId}`);
    const res2 = await request.get('/admin/driver');
    const deletedDriverArrayLength = res2.body.length;
    expect(deleteDriver.status).toBe(200);
    expect(deleteDriver.text).toBe('Successfully deleted driver.');
    expect(deletedDriverArrayLength).toEqual(initialDriverArrayLength - 1);
    done();
  });
});
