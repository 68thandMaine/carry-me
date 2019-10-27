const mongoose = require('mongoose');
const serviceLocator = require('../../config/depInj');

const ContractService = serviceLocator.get('contractService');

const { compareObjects, comparePropertiesAndValues } = require('../services/compare');

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
  });
  afterAll(async (done) => {
    await Contract.deleteMany();
    await mongoose.connection.close();
    done();
  });

  describe('Entity functions with Contracts', () => {
    it('createContract creates a contract with the correct entityId.', async (done) => {
      const contract = mockContracts[0];
      const entity = mockEntities[0];
      const newContract = await ContractService.createNewContract(entity._id, contract);
      expect(newContract.entity.toString()).toBe(entity._id);
      done();
    });
    it('createContract requires an entityId.', async (done) => {
      const contract = mockContracts[0];
      const entityId = '';
      // const entityId = mockEntities[0]._id;
      const newContract = await ContractService.createNewContract(entityId, contract);
      expect(newContract).toEqual('A valid ID is required.');
      done();
    });
    it('showEntityContracts returns an empty array if no contracts are in the database', async (done) => {
      await Contract.deleteMany();
      const entityId = mockEntities[0]._id;
      const contracts = await ContractService.showEntityContracts(entityId);
      expect(contracts).toStrictEqual([]);
      done();
    });
    it('showEntityContracts returns all contracts in the database', async (done) => {
      const entityId = mockEntities[0]._id;
      const contracts = await ContractService.showEntityContracts(entityId);
      expect(contracts.length).toBeGreaterThan(0);
      contracts.forEach((contract) => {
        expect(contract.entity.toString()).toBe(entityId);
      });
      done();
    });
    it('showOneEntityContract() returns an error message if the contract is not found.', async (done) => {
      await Contract.deleteMany();
      const contractId = mockContracts[2]._id;
      const contract = await ContractService.showOneEntityContract(contractId);
      expect(contract).toEqual('There was an error finding this contract.');
      done();
    });
    it('showOneEntityContract() returns one contract from the database.', async (done) => {
      const entityId = mockEntities[0]._id;
      const contract = mockContracts[2];
      const contractId = contract._id;
      const foundContract = await ContractService.showOneEntityContract(entityId, contractId);
      comparePropertiesAndValues(contract, foundContract);
      done();
    });
    it('updateContract() updates a contract for the entity.', async (done) => {
      const contract = mockContracts[2];
      const contractId = contract._id;
      const updatedContract = await ContractService.updateContract(contractId, {
        location_start: 'Fairfax, VA',
      });
      expect(updatedContract.location_start).not.toEqual(contract.location_start);
      expect(updatedContract._id.toString()).toEqual(contractId);
      done();
    });
    it('updateContract() will return an error message if the contractId is not valid.', async (done) => {
      const contract = mockContracts[0];
      const contractId = contract._id;
      const updatedContract = await ContractService.updateContract(contractId, {
        location_start: 'Stafford, VA',
      });
      expect(updatedContract).toEqual('There was an error finding a contract with the given Id.');
      done();
    });
    it('deleteContract() deletes a contract for an entity', async (done) => {
      const contract = mockContracts[2];
      const { entity } = contract;
      const contractId = contract._id;
      const deletedContract = await ContractService.deleteContract(entity, contractId);
      const allEntityContracts = await ContractService.showEntityContracts(entity);
      expect(deletedContract.deletedCount).toBe(1);
      // One of the mock contracts does not have an entity it, so subtract 1
      expect(allEntityContracts.length).toEqual(mockContracts.length - 1);
      done();
    });
    it('deleteContract() will return an error message if the contractId is invalid.', async (done) => {
      const contract = mockContracts[0];
      const contractId = contract._id;
      const deletedContract = await ContractService.deleteContract(contractId);
      expect(deletedContract).toEqual('There was an error deleting this contract.');
      done();
    });
  });
  it('showDriverContracts() will show all contracts for for a driver.', async (done) => {
    const driverId = mockDrivers[1]._id;
    const contracts = await ContractService.showDriverContracts(driverId);
    for (let i = 0; i < contracts.length; i += 1) {
      expect(contracts[i].driver.toString()).toBe(driverId);
    }
    done();
  });
});
