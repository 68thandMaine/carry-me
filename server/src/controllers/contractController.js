class ContractController {
  constructor(log, contractService, httpStatus) {
    this.log = log;
    this.contractService = contractService;
    this.httpStauts = httpStatus;
  }

  async index(req, res) {
    try {
      const result = await this.contractService.listAllContracts();
      res.send(result)
    } catch (err) {
      this.log.error('There was an issue returning all contracts from the database.');
      res.send(err._message);
    }
  }

  async create(req, res) {
    const { entityId } = req.params;
    let { body } = req;
    try {
      const result = await this.contractService.createNewContract(entityId, body);
      this.log.info(`Contract ${result._id} created for entity ${entityId}.`);
      res.send(result);
    } catch (err) {
      this.log.error(`There was an error creating a contract for ${body.entityName} - ${err.message}`);
      res.status(400).send(err._message);
    } 
  }

  async index_EntityContracts(req, res) {
    const { entityId } = req.params;
    try {
      const contracts = await this.contractService.showEntityContracts(entityId);
      this.log.info(`${contracts.length} contracts returned for entity ${entityId}.`);
      res.send(contracts);
    } catch (err) {
      this.log.error(`Error retreiving contracts for entity: ${entityId}. ${err.message}`);
      res.status(400).send(err);
    }
  }

  async show(req, res) {
    const { contractId, entityId } = req.params;
    try {
      const contract = await this.contractService.showOneEntityContract(entityId, contractId);
      this.log.info(`Contract with id - ${contractId} was returned.`);
      res.send(contract);
    } catch (err) {
      this.log.error(`There was an error finding contract with id - ${contractId} becasue ${err.message}.`);
      res.status(400).send(err);
    }
  }

  async update(req, res) {
    const { contractId } = req.params;
    const { body } = req;
    try {
      const contract = await this.contractService.updateContract(contractId, body);
      this.log.info(`Contract with id - ${contractId} updated.`);
      res.send(contract);
    } catch (err) {
      this.log.error(`Error updatting contract with id - ${contractId} because: ${err.message}`);
      res.status(400).send(err);
    }
  }

  async delete(req, res) {
    const { entityId, contractId } = req.params;
    try {
      const deleted = await this.contractService.deleteContract(entityId, contractId);
      this.log.info(`Entity with id - ${entityId} successfully deleted contract with id - ${contractId}`);
      res.send(deleted);
    } catch (err) {
      this.log.error(`Error deleteting contract with id - ${contractId} for entity with id - ${entityId} because: ${err.message}`);
      res.status(400).send(err);
    }
  }
}

module.exports = ContractController;
