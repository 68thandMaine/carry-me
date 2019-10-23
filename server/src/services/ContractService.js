class ContractService {
  constructor(log, mongoose, httpStatus) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
  }
  
  async createNewContract(entityId, body) {
    const Contract = this.mongoose.model('Contract');
    if (entityId.length <= 0) {
      this.log.error('No entityId provided for the creation of the contract.');
      return 'A valid ID is required.';
    }
    let newContract = new Contract(body);
    newContract.entity = entityId;
    newContract = await newContract.save();
    this.log.info('Contract created successfully.');
    return newContract;
  }

  async showEntityContracts(entityId) {
    const Contract = this.mongoose.model('Contract');
    const contracts = await Contract.find({ entity: entityId });
    if (!contracts) {
      this.log.error(`There was an error finding contracts for entityId: - ${entityId}`);
      return 'There was an error finding contracts for this entity.';
    }
    return contracts;
  }

  async showOneEntityContract(entityId, contractId) {
    const Contract = this.mongoose.model('Contract');
    const Entity = this.mongoose.model('Entity');
    const entity = await Entity.findOne({ _id: entityId });
    const contract = await Contract.findOne({ _id: contractId });
    if (!contract) {
      this.log.error('The contractId was not found in the database.');
      return 'There was an error finding this contract.';
    }
    this.log.info(`Contract with id - ${contract._id} was found.`);
    return contract;
  }

  async updateContract(contractId, updates) {
    const Contract = this.mongoose.model('Contract');
    const contract = await Contract.findByIdAndUpdate(contractId, updates, {
      new: true,
      runValidator: true,
    });
    if(!contract) {
      this.log.error(`There was an error updating contract - ${contractId} with updates: ${updates}`);
      return 'There was an error finding a contract with the given Id.';
    }
    this.log.info(`Contract - ${contractId} was successfully updated with ${updates}`);
    return contract;
  }


  async deleteContract(contractId) {
    const Contract = this.mongoose.model('Contract');
    const contract = await Contract.deleteOne({ _id: contractId });
    if (contract.deletedCount <= 0) {
      this.log.error(`Deletion failed: Contract with id - ${contractId} was not found in the database.`);
      return 'There was an error deleting this contract.';
    }
    contract.message = 'Contract deleted successfully.';
    this.log.info(`Contract with id - ${contractId} was deleted successfully.`);
    return contract;
  }
}

module.exports = ContractService;
