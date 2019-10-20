const mongoose = require('mongoose');
const serviceLocator = require('../../config/depInj');

const ContractService = serviceLocator.get('contractService');

const Entity = require('../../src/models/Entity.model');
const mockEntities = require('../mock-data/mock-entity');
const Driver = require('../../src/models/Driver.model');
const mockDrivers = require('../mock-data/mock-driver');
const Contract = require('../../src/models/Contract.model');
const mockContracts = require('../mock-data/mock-contracts');

describe('ContractService', () => {
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
    await Contract.deleteMany();
    done();
  })
  afterAll(async (done) => {
    await Contract.deleteMany();
    await mongoose.connection.close();
    done();
  });

  describe('Entity functions with contracts', () => {
    it('createContract creates a contract with the correct entityId.', async (done) => {

      done();
    });
    it('createContract returns an error message if the contract is not created.', async (done) => {

      done();
    });
    it('showEntityContracts returns an empty array if no contracts are in the database', async (done) => {

      done();
    });
    it('showEntityContracts returns all contracts in the database', async (done) => {
      
      done();
    });
    it('showOneEntityContract() returns an empty object and error message if no contract is found.', async (done) => {

      done();
    });
    it('showOneEntityContract() returns one contract from the database.', async (done) => {

      done();
    });
    it('entityUpdateContract() updates a contract for the entity.', async (done) => {

    });
    it('deleteContract() deletes a contract for an entity', async (done) => {

    });
  });
  describe('Driver contract functionality', () => {
    it('')
  });
});